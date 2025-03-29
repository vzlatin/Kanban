import localstyles from "./ImageCropperDialog.module.css";
import styles from "../CustomDialog.module.css";

import { Dialog, DialogPanel } from "@headlessui/react";
import ImageCropper from "../../image/ImageCropper";
import { User } from "../../../types/entities";

type ImageCropperDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const ImageCropperDialog: React.FC<ImageCropperDialogProps> = (
  { isOpen, onClose, user },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={localstyles["dialog-panel"]}>
            <div className={styles["dialog-description"]}>
              <ImageCropper user={user} onClose={onClose} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageCropperDialog;
