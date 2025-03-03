import localstyles from "./DeleteBoardDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Board } from "../../../../types/entities";

type DeleteBoardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  messageHandler: (board: Board) => void;
};

const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = (
  { isOpen, onClose, board, messageHandler },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Delete Board: {board?.title}
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <p className={localstyles["dialog-warning"]}>
                Deleting a Board will result in the deletion of all of its
                associated data (Columns, Tasks, Comments etc.) Do you want to
                proceed?
              </p>
              <div className={localstyles["buttons"]}>
                <button
                  className={localstyles["buttons-ok-delete"]}
                  onClick={() => {
                    if (board) {
                      messageHandler(board);
                    }
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

export default DeleteBoardDialog;
