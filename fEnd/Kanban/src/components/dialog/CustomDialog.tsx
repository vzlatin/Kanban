import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import styles from "./CustomDialog.module.css";

type CustomDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  //onChange?: (value: string) => void;
};

const CustomDialog: React.FC<CustomDialogProps> = (
  { isOpen, onClose, title, children },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              {title}
            </DialogTitle>
            <div className={styles["dialog-description"]}>{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default CustomDialog;
