import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Section } from "../../../../types/entities";

type UpdateSectionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  section: Section;
  messageHandler: (section: Section) => void;
};

const UpdateSectionDialog: React.FC<UpdateSectionDialogProps> = ({
  isOpen,
  onClose,
  section,
  messageHandler,
}) => {
  const [sectionTitle, setSectionTitle] = useState(section.title);

  return (
    <Dialog open={isOpen} as="div" onClose={onClose} className="absolute z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-background">
        <div className="min-h-screen z-10 flex flex-row justify-center items-center">
          <DialogPanel
            transition
            className="w-100% max-w-[28rem] rounded-[0.5rem] bg-background shadow-md backdrop-blur-[32px] duration-300 ease-out data-closed:opacity-0 data-closed:scale-[0.95] p-[1.5rem]"
          >
            <DialogTitle className="font-medium text-[1.5rem] text-primary mt-0">
              Update Section: {section.title}
            </DialogTitle>
            <div className="flex flex-row items-center gap-[2rem]">
              <input
                className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none w-[70%] font-medium bg-background inset-shadow-md border border-accent-grey-100"
                type="text"
                placeholder="Board Title"
                onChange={(e) => setSectionTitle(e.target.value)}
                value={sectionTitle}
              />
              <div className="flex flex-row gap-[0.5rem]">
                <button
                  className={`${
                    sectionTitle === section.title || sectionTitle === ""
                      ? "pointer-events-none h-[3rem] border border-accent-grey-100  w-[5rem] text-primary p-[0.5rem] bg-background font-medium text-[1.2rem] rounded-[0.5rem] transition-transform scale-[0.9] duration-100 ease hover:shadow-md hover:scale-[1] hover:cursor-pointer active:shadow-none active:inset-shadow-md"
                      : "h-[3rem] w-[5rem] border border-accent-blue-200 text-primary p-[0.5rem] bg-background font-medium text-[1.2rem] rounded-[0.5rem] transition-transform scale-[0.9] duration-100 ease hover:shadow-md hover:scale-[1] hover:cursor-pointer active:shadow-none active:inset-shadow-md"
                  }`}
                  disabled={
                    sectionTitle === section.title || sectionTitle === ""
                  }
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
                  className="h-[3rem] w-[5rem] border border-danger text-primary p-[0.5rem] bg-background font-medium text-[1.2rem] rounded-[0.5rem] transition-transform scale-[0.9] duration-100 ease hover:cursor-pointer hover:shadow-md hover:scale-[1] active:shadow-none active:inset-shadow-md"
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
