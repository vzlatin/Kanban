import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Board } from "../../../../types/entities";

type DeleteBoardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  board: Board | null;
  messageHandler: (board: Board) => void;
};

const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = ({
  isOpen,
  onClose,
  board,
  messageHandler,
}) => {
  return (
    <Dialog open={isOpen} as="div" onClose={onClose} className="absolute z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-background">
        <div className="min-h-screen z-10 flex flex-row justify-center items-center">
          <DialogPanel
            transition
            className="w-100% max-w-[28rem] rounded-[0.5rem] bg-background shadow-md backdrop-blur-[32px] duration-300 ease-out data-closed:opacity-0 data-closed:scale-[0.95] p-[1.5rem]"
          >
            <DialogTitle className="font-medium text-[1.5rem] text-primary mt-0">
              Delete Board: {board?.title}
            </DialogTitle>
            <div className="flex flex-row items-center gap-[2rem]">
              <p className="font-medium text-[0.8rem] text-primary p-[0.5rem] border border-danger rounded-[0.5rem]">
                Deleting a Board will result in the deletion of all of its
                associated data (Columns, Tasks, Comments etc.) Do you want to
                proceed?
              </p>
              <div className="flex flex-row gap-[0.5rem]">
                <button
                  className="h-[3rem] w-[5rem] border border-danger text-primary p-[0.5rem] bg-background font-medium text-[1.2rem] rounded-[0.5rem] transition-transform scale-[0.9] duration-100 ease hover:cursor-pointer hover:shadow-md hover:scale-[1] active:shadow-none active:inset-shadow-md"
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
                  className="h-[3rem] w-[5rem] border border-accent-blue-200 text-primary p-[0.5rem] bg-background font-medium text-[1.2rem] rounded-[0.5rem] transition-transform scale-[0.9] duration-100 ease hover:shadow-md hover:scale-[1] hover:cursor-pointer active:shadow-none active:inset-shadow-md"
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
