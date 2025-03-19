import { ensureDir, ensureDirSync } from "@std/fs";
import { type Middleware } from "@oak/oak/middleware";
import { Context } from "@oak/oak/context";
import { join } from "@std/path";
import { ApiError } from "../../errors/apiErrors.ts";

interface UploadOptions {
  extensions?: Array<string>;
  maxSizeBytes?: number;
  maxFileSizeBytes?: number;
  saveFile?: boolean;
  readFile?: boolean;
  useCurrentDir?: boolean;
  useDateTimeSubDir?: boolean;
  onError?: (ctx: Context, error: unknown) => Promise<void> | void;
}

interface ProcessedFile {
  filename: string;
  size: number;
  type: string;
  contents: Uint8Array | null;
  uri: string;
  url: string;
}

interface Result {
  data: Record<string, ProcessedFile>;
}

export class FileUploader {
  private path: string;
  private options: Required<UploadOptions>;
  private defaultOptions: Required<UploadOptions> = {
    extensions: [],
    maxSizeBytes: Number.MAX_SAFE_INTEGER,
    maxFileSizeBytes: Number.MAX_SAFE_INTEGER,
    saveFile: true,
    readFile: false,
    useCurrentDir: true,
    useDateTimeSubDir: true,
    onError: console.log,
  };
  private validationErrors: string[] = [];
  private result: Result = { data: {} };

  constructor(path: string, options?: Partial<UploadOptions>) {
    this.path = path;
    this.options = { ...this.defaultOptions, ...options };
  }

  handler(): Middleware {
    ensureDirSync(join(Deno.cwd(), "temp_uploads"));

    const middleware: Middleware = async (ctx, next) => {
      try {
        const { request } = ctx;
        if (!request.hasBody) {
          throw ApiError.BadRequestError("Missing request body");
        }

        const contentLength = request.headers.get("content-length");
        const contentType = request.headers.get("content-type");
        if (!contentLength) {
          throw ApiError.BadRequestError("Content length is 0");
        }
        if (!contentType) {
          throw ApiError.BadRequestError("Content type is missing");
        }
        if (parseInt(contentLength) > this.options.maxSizeBytes) {
          throw ApiError.BadRequestError(
            `Total upload size exceeded. Uploaded: ${contentLength}. Allowed maximum: ${this.options.maxSizeBytes}`,
          );
        }

        const boundary = ((contentType: string): string | null => {
          const match = contentType.match(/boundary=(.*)$/);
          return match ? match[1] : null;
        })(contentType);

        if (!boundary) {
          throw ApiError.UnprocessableEntity(
            "Invalid form data. The request body should be encoded as 'multipart/form-data'.",
          );
        }

        const formData = await request.body.formData();
        const entries = Array.from(formData);

        for (const [key, value] of entries) {
          if (value instanceof File) {
            this.result.data[key] = await this.processFiles([value]);
          } else if (Array.isArray(value)) {
            const files = value.filter((f) => f instanceof File);
            if (files.length > 0) {
              this.result.data[key] = await this.processFiles(files);
            }
          }
        }

        if (this.validationErrors.length > 0) {
          throw ApiError.UnprocessableEntity(
            `Unprocessable Entity: ${this.validationErrors.join(" ")}`,
          );
        }

        ctx.state.uploadedFiles = this.result;
        console.log(ctx.state.uploadedFiles);
        //await next();
      } catch (error) {
        const processedErrorResult = this.options.onError(ctx, error);
        if (processedErrorResult instanceof Promise) await processedErrorResult;
      }
      //await next();
    };

    return middleware;
  }

  private async processFiles(
    files: File[],
  ): Promise<ProcessedFile> {
    const processedFile: ProcessedFile = {
      filename: "",
      contents: null,
      size: 0,
      type: "",
      uri: "",
      url: "",
    };

    for (const file of files) {
      const filename = file.name;
      const extension = filename.split(".").pop() ?? "";

      processedFile.filename = filename;
      processedFile.type = file.type;
      processedFile.size = file.size;

      if (!extension && !this.options.extensions.includes(extension)) {
        this.validationErrors.push(
          `File extension ${extension} in ${filename} is not allowed. Allowed extentions: ${this.options.extensions.join()}.`,
        );
        // Skip this iteration. It doesn't matter if the validation fails downstream.
        continue;
      }

      if (file.size > this.options.maxFileSizeBytes) {
        this.validationErrors.push(
          `File size exceeds limit. File: ${file.name}, Size: ${file.size} bytes, Limit: ${this.options.maxFileSizeBytes} bytes. `,
        );
        // Skip this iteration. It doesn't matter if the validation fails downstream.
        continue;
      }

      if (this.options.readFile) {
        const contents = await file.arrayBuffer();
        processedFile.contents = new Uint8Array(contents);
      }

      if (this.options.saveFile) {
        const savedFilePath = await this.saveFileToDisk(file);
        processedFile.uri = savedFilePath;
        processedFile.url = savedFilePath.replace(Deno.cwd(), "").replace(
          /\\/g,
          "/",
        );
        if (!processedFile.url.startsWith("/")) {
          processedFile.url = "/" + processedFile.url;
        }
        processedFile.url = encodeURI(processedFile.url);
      } else {
        const tempUploadsDir = join(Deno.cwd(), "temp_uploads");
        const tempFilePath = join(
          tempUploadsDir,
          `${crypto.randomUUID()}_${file.name}`,
        );
        const tempContents = await file.arrayBuffer();
        await Deno.writeFile(tempFilePath, new Uint8Array(tempContents));

        processedFile.uri = tempFilePath;
        processedFile.url = "";
      }
    }
    return processedFile;
  }

  private async saveFileToDisk(file: File): Promise<string> {
    let uploadPath = this.path;

    if (this.options.useDateTimeSubDir) {
      const now = new Date();

      // We just care about a randomly generated uuid
      // to avoid naming collisions
      const subDirTree = join(
        now.getFullYear().toString(),
        (now.getMonth() + 1).toString().padStart(2, "0"),
        now.getDate().toString().padStart(2, "0"),
        now.getHours().toString().padStart(2, "0"),
        now.getMinutes().toString().padStart(2, "0"),
        now.getSeconds().toString().padStart(2, "0"),
        crypto.randomUUID(),
      );
      uploadPath = join(this.path, subDirTree);
    }

    const fullPath = this.options.useCurrentDir
      ? join(Deno.cwd(), uploadPath)
      : uploadPath;

    await ensureDir(fullPath);

    const filePath = join(fullPath, file.name);
    const contents = await file.arrayBuffer();
    await Deno.writeFile(filePath, new Uint8Array(contents));

    return filePath;
  }
}
