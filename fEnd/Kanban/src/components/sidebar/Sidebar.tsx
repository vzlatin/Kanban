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
      <div className="flex flex-col">
        <div className="w-[20rem] mt-[0.625rem] shrink-[0] overflow-y-auto">
          {sections.map((section) => (
            <SidebarSection
              key={section.id}
              id={section.id}
              title={section.title}
            />
          ))}
        </div>
        <hr className="text-primary w-90%" />
        <div
          className="flex flex-row items-center mt-[1rem] mx-auto p-[0.4rem] transition-transform duration-100 ease-in-out rounded-[0.5rem] hover:shadow-md hover:scale-[1.03] hover:cursor-pointer active:shadow-none active:inset-shadow-md"
          onClick={open}
        >
          <button className="text-primary p-[0.5rem] bg-background border-none font-medium text-[1.2rem] hover:cursor-pointer">
            Add a new Section
          </button>
          <img src="/section.svg" />
        </div>
      </div>

      <AddSectionDialog
        isOpen={isOpen}
        onClose={close}
        onChange={(e) => setSectionTitle(e.target.value)}
        sectionTitle={sectionTitle}
        messageHandler={addSection}
      ></AddSectionDialog>
    </>
  );
};

export default Sidebar;
