import { Context } from "@oak/oak/context";

export interface ProcessedFile {
  filename: string;
  size: number;
  type: string;
  contents: Uint8Array | null;
  uri: string;
  url: string;
}

export interface UploadOptions {
  extensions?: Array<string>;
  maxSizeBytes?: number;
  maxFileSizeBytes?: number;
  saveFile?: boolean;
  readFile?: boolean;
  useCurrentDir?: boolean;
  useDateTimeSubDir?: boolean;
  onError?: (ctx: Context, error: unknown) => Promise<void> | void;
}

export interface FileUploadResult {
  data: Array<Record<string, ProcessedFile>>;
}
