import { useRef, useState } from "react";
import styles from "./ImageCropper.module.css";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  Crop,
  makeAspectCrop,
} from "react-image-crop";
import { setCanvasPreview } from "../../miscellaneous/utils/canvas-preview";
import { useKanbanStore } from "../../state/stores/global/global.store";
import { User } from "../../types/entities";

type ImageCropperProps = {
  onClose: () => void;
  user: User;
};

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 1;

const ImageCropper: React.FC<ImageCropperProps> = ({ onClose, user }) => {
  const changeProfilePicture = useKanbanStore((state) =>
    state.changeUserProfilePic
  );

  const [imgData, setImgData] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [mimeType, setMimeType] = useState("");

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFileName(files[0].name);
    setMimeType(files[0].type);

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imgDataString = reader.result?.toString() ?? "";
      imageElement.src = imgDataString;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } = e
          .currentTarget as HTMLImageElement;
        if (naturalHeight < MIN_DIMENSION || naturalWidth < MIN_DIMENSION) {
          setError(
            `The image should be at least ${MIN_DIMENSION} by ${MIN_DIMENSION} pixels`,
          );
          return setImgData("");
        }
      });

      setImgData(imgDataString);
    });
    reader.readAsDataURL(files[0]);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (error) setError("");
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const processImage = () => {
    if (!imageRef.current) {
      throw new Error("Missing Image Ref");
    }
    if (!canvasRef.current) {
      throw new Error("Missing Canvas Ref");
    }
    if (!crop) {
      throw new Error("Missing Crop");
    }
    const img = imageRef.current;
    const canvas = canvasRef.current;
    setCanvasPreview(
      img,
      canvas,
      convertToPixelCrop(crop, img.width, img.height),
    );
    canvas.toBlob(async (blob) => {
      if (!blob) {
        throw new Error("Canvas conversion to Blob failed.");
      }

      const formData = new FormData();
      formData.append(
        `${user.firstName} ${user.lastName} profile-image`,
        blob,
        fileName,
      );

      await changeProfilePicture(formData);
    }, mimeType);
  };

  return (
    <>
      <div className={styles["component-container"]}>
        <input
          type="file"
          accept="image/*"
          name="profile-image"
          className={styles["image-input"]}
          onChange={onSelectFile}
        />
        {error && (
          <p
            style={{
              "color": "#860111",
              "fontFamily": "QuicksandMedium, sans-serif",
            }}
          >
            {error}
          </p>
        )}
        {imgData &&
          (
            <div className={styles["crop-container"]}>
              <ReactCrop
                crop={crop}
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}
                onChange={(_pixelCrop, percentCrop) => setCrop(percentCrop)}
              >
                <img
                  ref={imageRef}
                  src={imgData}
                  alt="Upload"
                  style={{
                    "maxHeight": "30rem",
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <div className={styles["crop-buttons"]}>
                <button
                  className={styles["crop-button-ok"]}
                  onClick={() => {
                    processImage();
                    onClose();
                  }}
                >
                  Crop
                </button>
                <button
                  className={styles["crop-button-nok"]}
                  onClick={() => {
                    onClose();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
      </div>
      {crop && (
        <canvas
          ref={canvasRef}
          style={{
            "display": "none",
            "width": "150px",
            "height": "150px",
          }}
        >
        </canvas>
      )}
    </>
  );
};

export default ImageCropper;
