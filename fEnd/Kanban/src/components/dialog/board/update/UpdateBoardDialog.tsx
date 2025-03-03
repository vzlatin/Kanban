import localstyles from "./UpdateBoardDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Board } from "../../../../types/entities";

type UpdateBoardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  messageHandler: (board: Board) => void;
};

const UpdateBoardDialog: React.FC<UpdateBoardDialogProps> = (
  { isOpen, onClose, board, messageHandler },
) => {
  const [boardTitle, setBoardTitle] = useState(board?.title || "");
  useEffect(() => {
    setBoardTitle(board?.title || "");
  }, [board]);

  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Update Board: {boardTitle}
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <input
                className={localstyles["dialog-description-input"]}
                type="text"
                placeholder="Board Title"
                onChange={(e) =>
                  setBoardTitle(e.target.value)}
                value={boardTitle}
              />
              <div className={localstyles["buttons"]}>
                <button
                  className={`${
                    boardTitle === board?.title || boardTitle === ""
                      ? localstyles["button-disabled"]
                      : localstyles["buttons-ok"]
                  }`}
                  disabled={boardTitle === board?.title ||
                    boardTitle === ""}
                  onClick={() => {
                    if (board) {
                      messageHandler({
                        ...board,
                        title: boardTitle,
                      });
                    }
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

export default UpdateBoardDialog;
