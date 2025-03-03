import localstyles from "./AddSectionDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type AddSectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sectionTitle: string;
  messageHandler: (sectionTitle: string) => void;
};

const AddSectionDialog: React.FC<AddSectionDialogProps> = (
  { isOpen, onClose, onChange, sectionTitle, messageHandler },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Add a new Section
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <input
                className={localstyles["dialog-description-input"]}
                type="text"
                placeholder="Board Title"
                onChange={onChange}
                value={sectionTitle}
              />
              <div className={localstyles["buttons"]}>
                <button
                  className={`${
                    sectionTitle === ""
                      ? localstyles["button-disabled"]
                      : localstyles["buttons-ok"]
                  }`}
                  disabled={sectionTitle === ""}
                  onClick={() => {
                    messageHandler(sectionTitle);
                    onClose();
                  }}
                >
                  Add
                </button>
                <button
                  className={localstyles["buttons-nok"]}
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddSectionDialog;
