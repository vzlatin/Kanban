import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useKanbanStore } from "../../../state/stores/global/global.store";
import { User } from "../../../types/entities";
import { useState } from "react";

type AddTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTaskDialog: React.FC<AddTaskDialogProps> = ({ isOpen, onClose }) => {
  const users = useKanbanStore((state) => state.users);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers =
    query === ""
      ? users
      : users.filter((u) => {
          return (
            u.firstName.toLowerCase().includes(query.toLowerCase()) ||
            u.lastName.toLowerCase().includes(query.toLowerCase())
          );
        });

  return (
    <Dialog open={isOpen} as="div" onClose={onClose} className="absolute z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-background">
        <div className="min-h-screen z-10 flex flex-row justify-center items-center">
          <DialogPanel
            transition
            className="w-3xl rounded-[0.5rem] bg-background shadow-md backdrop-blur-[32px] duration-300 ease-out data-closed:opacity-0 data-closed:scale-[0.95] p-[1.5rem]"
          >
            <DialogTitle className="font-medium text-[1.5rem] text-primary mt-0">
              Add a new Task
            </DialogTitle>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <input
                  className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none w-[100%] font-medium bg-background inset-shadow-md border border-accent-grey-100"
                  type="text"
                  placeholder="Task Title"
                />
              </div>

              <div className="flex flex-row gap-4">
                <textarea
                  className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none w-[100%] font-medium bg-background inset-shadow-md border border-accent-grey-100"
                  placeholder="Task Description"
                ></textarea>
              </div>

              <div className="flex flex-row gap-4">
                <input
                  className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none font-medium bg-background inset-shadow-md border border-accent-grey-100 w-[40%]"
                  type="text"
                  placeholder="Tag"
                />
                <Combobox
                  value={selectedUser}
                  onChange={(val) => setSelectedUser(val)}
                  onClose={() => setQuery("")}
                >
                  <div className="flex flex-row items-center">
                    <ComboboxInput
                      className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none font-medium bg-background inset-shadow-md border border-accent-grey-100"
                      aria-label="Assignee"
                      displayValue={(u: User) =>
                        u ? u.firstName + " " + u.lastName : "Assign to"
                      }
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ComboboxButton className="transition-transform scale-[0.9] duration-100 ease hover:cursor-pointer hover:scale-[1] ml-4">
                      <img
                        src="/chevron.svg"
                        className="hover:cursor-pointer"
                      />
                    </ComboboxButton>
                    <ComboboxOptions
                      anchor="bottom"
                      className="w-(--input-width) rounded-[0.5rem] border border-accent-grey-100 bg-background p-4 [--anchor-gap:--spacing(1)] empty:invisible z-20"
                    >
                      {filteredUsers.map((u) => (
                        <ComboboxOption
                          key={u.id}
                          value={u}
                          className="data-focus:shadow-sm p-1 hover:cursor-pointer rounded-[0.5rem] truncate"
                        >
                          {u.firstName + " " + u.lastName}
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  </div>
                </Combobox>

                <button className="w-[5rem] text-background p-[0.5rem] bg-accent-blue-200 font-medium text-[1.2rem] rounded-[0.5rem] transition-transform scale-[0.9] duration-100 ease hover:shadow-md hover:scale-[1] hover:cursor-pointer active:shadow-none active:inset-shadow-md-blue ml-auto">
                  Add
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddTaskDialog;
