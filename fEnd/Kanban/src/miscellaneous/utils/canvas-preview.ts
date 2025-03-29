import { Crop } from "react-image-crop";

export const setCanvasPreview = (
  image: HTMLImageElement | null,
  canvas: HTMLCanvasElement | null,
  crop: Crop,
) => {
  if (!canvas || !image) {
    throw new Error("No canvas or image provided.");
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2D context available.");
  }

  const scaleX = image.naturalWidth / image.width; // Scale from rendered size to original
  const scaleY = image.naturalHeight / image.height;

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  // Ensure the final output is always 150x150
  const outputSize = 150;
  canvas.width = outputSize;
  canvas.height = outputSize;

  // Clear the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingQuality = "high";

  // Draw the cropped image and scale it to 150x150
  ctx.drawImage(
    image,
    cropX,
    cropY, // Source X, Y (start of crop)
    cropWidth,
    cropHeight, // Source Width & Height (crop size)
    0,
    0, // Destination X, Y on the canvas
    outputSize,
    outputSize, // Destination Width & Height (150x150)
  );
  ctx.restore();
};
