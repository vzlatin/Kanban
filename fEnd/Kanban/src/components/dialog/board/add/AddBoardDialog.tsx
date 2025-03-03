import localstyles from "./AddBoardDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

type AddBoardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  boardTitle: string;
  messageHandler: (boardTitle: string) => void;
};

const AddBoardDialog: React.FC<AddBoardDialogProps> = (
  { isOpen, onClose, onChange, boardTitle, messageHandler },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Add a new Board
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <input
                className={localstyles["dialog-description-input"]}
                type="text"
                placeholder="Board Title"
                onChange={onChange}
                value={boardTitle}
              />
              <div className={localstyles["buttons"]}>
                <button
                  className={`${
                    boardTitle === ""
                      ? localstyles["button-disabled"]
                      : localstyles["buttons-ok"]
                  }`}
                  disabled={boardTitle === ""}
                  onClick={() => {
                    messageHandler(boardTitle);
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

export default AddBoardDialog;
