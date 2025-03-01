import styles from "./Sidebar.module.css";

import { useState } from "react";
import { Section } from "../../types/entities";
import CustomDialog from "../dialog/CustomDialog";
import SidebarSection from "../sidebar-section/SidebarSection";
import { Message, OutboundMessageType } from "../../types/messages";
import { useKanbanStore } from "../../state/stores/global/global.store";

type SidebarProps = {
  sections: Section[];
};

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  const send = useKanbanStore((state) => state.send);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const addSection = (title: string): void => {
    const message: Message = {
      type: OutboundMessageType.CreateSection,
      payload: { title },
    };
    send(message);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles.sidebar}>
          {sections.map((section) => (
            <SidebarSection
              key={section.id}
              id={section.id}
              title={section.title}
            />
          ))}
        </div>

        <hr />
        <div className={styles["add-section"]}>
          <button
            onClick={open}
          >
            Add a new Section
          </button>
          <CustomDialog
            isOpen={isOpen}
            onClose={close}
            title="Add a new Section"
          >
            <input
              className={styles["dialog-description-input"]}
              type="text"
              placeholder="Section Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className={styles["buttons"]}>
              <button
                className={`${
                  title === ""
                    ? styles["button-disabled"]
                    : styles["buttons-ok"]
                }`}
                onClick={() => {
                  addSection(title);
                  close();
                }}
              >
                Add
              </button>
              <button className={styles["buttons-nok"]} onClick={close}>
                Cancel
              </button>
            </div>
          </CustomDialog>
          <img src="/board.svg" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
