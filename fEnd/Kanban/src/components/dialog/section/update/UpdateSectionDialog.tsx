import localstyles from "./UpdateSectionDialog.module.css";
import styles from "../../CustomDialog.module.css";

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Section } from "../../../../types/entities";

type UpdateSectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  section: Section;
  messageHandler: (section: Section) => void;
};

const UpdateSectionDialog: React.FC<UpdateSectionDialogProps> = (
  { isOpen, onClose, section, messageHandler },
) => {
  const [sectionTitle, setSectionTitle] = useState(section.title);

  return (
    <Dialog open={isOpen} as="div" className={styles.dialog} onClose={onClose}>
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={styles["dialog-panel"]}>
            <DialogTitle className={styles["dialog-title"]}>
              Update Section: {section.title}
            </DialogTitle>
            <div className={styles["dialog-description"]}>
              <input
                className={localstyles["dialog-description-input"]}
                type="text"
                placeholder="Board Title"
                onChange={(e) =>
                  setSectionTitle(e.target.value)}
                value={sectionTitle}
              />
              <div className={localstyles["buttons"]}>
                <button
                  className={`${
                    sectionTitle === section.title || sectionTitle === ""
                      ? localstyles["button-disabled"]
                      : localstyles["buttons-ok"]
                  }`}
                  disabled={sectionTitle === section.title ||
                    sectionTitle === ""}
                  onClick={() => {
                    messageHandler({
                      ...section,
                      title: sectionTitle,
                    });
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

export default UpdateSectionDialog;
