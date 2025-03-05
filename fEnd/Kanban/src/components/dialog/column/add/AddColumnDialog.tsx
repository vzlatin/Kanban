import localstyles from "./AddColumnDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type AddColumnDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  columnTitle: string;
  messageHandler: (columnTitle: string) => void;
};

const AddColumnDialog: React.FC<AddColumnDialogProps> = (
  { isOpen, onClose, onChange, columnTitle, messageHandler },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Add a new Column
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <input
                className={localstyles["dialog-description-input"]}
                type="text"
                placeholder="Column Title"
                onChange={onChange}
                value={columnTitle}
              />
              <div className={localstyles["buttons"]}>
                <button
                  className={`${
                    columnTitle === ""
                      ? localstyles["button-disabled"]
                      : localstyles["buttons-ok"]
                  }`}
                  disabled={columnTitle === ""}
                  onClick={() => {
                    messageHandler(columnTitle);
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

export default AddColumnDialog;
