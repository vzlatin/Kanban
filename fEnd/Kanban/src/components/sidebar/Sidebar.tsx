import styles from "./Sidebar.module.css";

import { useState } from "react";
import { Section } from "../../types/entities";
import SidebarSection from "../sidebar-section/SidebarSection";
import { Message, OutboundMessageType } from "../../types/messages";
import { useKanbanStore } from "../../state/stores/global/global.store";
import AddSectionDialog from "../dialog/section/add/AddSectionDialog";

type SidebarProps = {
  sections: Section[];
};

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  const send = useKanbanStore((state) => state.send);
  const [isOpen, setIsOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
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
        <div className={styles["add-section"]} onClick={open}>
          <button>
            Add a new Section
          </button>
          <img src="/board.svg" />
        </div>
      </div>

      <AddSectionDialog
        isOpen={isOpen}
        onClose={close}
        onChange={(e) => setSectionTitle(e.target.value)}
        sectionTitle={sectionTitle}
        messageHandler={addSection}
      >
      </AddSectionDialog>
    </>
  );
};

export default Sidebar;
