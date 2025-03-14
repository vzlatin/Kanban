import localstyles from "./DeleteColumnDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Column } from "../../../../types/entities";

type DeleteColumnDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  column: Column;
  messageHandler: (column: Column) => void;
};

const DeleteColumnDialog: React.FC<DeleteColumnDialogProps> = (
  { isOpen, onClose, column, messageHandler },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Delete Column: {column.title}
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <p className={localstyles["dialog-warning"]}>
                Deleting a Column will result in the deletion of all of its
                associated data (Tasks, ToDo's, Comments etc.) Do you want to
                proceed?
              </p>
              <div className={localstyles["buttons"]}>
                <button
                  className={localstyles["buttons-ok-delete"]}
                  onClick={() => {
                    messageHandler(column);
                    onClose();
                  }}
                >
                  Delete
                </button>
                <button
                  className={localstyles["buttons-nok-delete"]}
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

export default DeleteColumnDialog;
