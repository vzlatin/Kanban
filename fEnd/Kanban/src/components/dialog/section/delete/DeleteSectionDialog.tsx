import localstyles from "./DeleteSectionDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Section } from "../../../../types/entities";

type DeleteSectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  section: Section;
  messageHandler: (section: Section) => void;
};

const DeleteSectionDialog: React.FC<DeleteSectionDialogProps> = (
  { isOpen, onClose, section, messageHandler },
) => {
  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Delete Board: {section.title}
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <p className={localstyles["dialog-warning"]}>
                Deleting a Section will result in the deletion of all of its
                associated data (Boards, Columns, Tasks, etc.) Do you want to
                proceed?
              </p>
              <div className={localstyles["buttons"]}>
                <button
                  className={localstyles["buttons-ok-delete"]}
                  onClick={() => {
                    messageHandler(section);
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

export default DeleteSectionDialog;
