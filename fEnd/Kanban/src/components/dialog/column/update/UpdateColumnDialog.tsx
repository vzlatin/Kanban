import localstyles from "./UpdateColumnDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Column } from "../../../../types/entities";
import { useState } from "react";

type UpdateColumnDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  //onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  column: Column;
  messageHandler: (column: Column) => void;
};

const UpdateColumnDialog: React.FC<UpdateColumnDialogProps> = (
  { isOpen, onClose, column, messageHandler },
) => {
  const [columnTitle, setColumnTitle] = useState(column.title);
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Edit Column: {column.title}
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <input
                className={localstyles["dialog-description-input"]}
                type="text"
                placeholder="Column Title"
                onChange={(e) =>
                  setColumnTitle(e.target.value)}
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
                    messageHandler({ ...column, title: columnTitle });
                    onClose();
                  }}
                >
                  Update
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

export default UpdateColumnDialog;
