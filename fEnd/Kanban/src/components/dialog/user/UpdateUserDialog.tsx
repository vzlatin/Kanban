import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { User, UserRoleLabels } from "../../../types/entities";
import ImageCropperDialog from "../image/ImageCropperDialog";

type UpdateUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [ImageCropperDialogOpen, setImageCropperDialogOpen] = useState(false);
  const closeImageCropperDialog = () => setImageCropperDialogOpen(false);

  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="absolute z-10"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-background">
          <div className="min-h-screen z-10 flex justify-center items-center p-[1rem]">
            <DialogPanel
              transition
              className="rounded-[0.5rem] bg-background p-[1.5rem] backdrop-blur-[32px] duration-300 ease-out"
            >
              <div className="flex flex-row items-center gap-[0.2rem]">
                <div className="rounded-[0.5rem] bg-background shadow-md flex flex-row p-[1rem] gap-[1rem]">
                  <div className="flex flex-col items-center">
                    {user.profileImageUrl ? (
                      <img
                        className="w-[7rem] h-[7rem]"
                        src={user.profileImageUrl}
                      />
                    ) : (
                      <img
                        className="w-[7rem] h-[7rem]"
                        src="/user-profile.svg"
                      />
                    )}
                    <button
                      className="font-medium text-[0.86rem] text-primary border-none rounded-[0.5rem] p-[0.5rem] hover:cursor-pointer hover:bg-primary hover:text-background active:bg-background active:text-primary"
                      onClick={() => setImageCropperDialogOpen(true)}
                    >
                      Change profile image
                    </button>
                  </div>
                  <div className="flex flex-col gap-[0.5rem]">
                    <div>
                      <label className="font-medium text-[0.86rem] flex flex-row gap-[1rem]">
                        <p>First Name:</p>
                        <input
                          name="first-name"
                          className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none font-medium bg-background inset-shadow-md border border-accent-grey-200"
                          type="text"
                          onChange={(e) => setFirstName(e.target.value)}
                          value={firstName}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="font-medium text-[0.86rem] flex flex-row gap-[1rem]">
                        <p>Last Name:</p>
                        <input
                          className="rounded-[0.5rem] p-[0.5rem] text-primary appearance-none font-medium bg-background inset-shadow-md border border-accent-grey-200"
                          type="text"
                          onChange={(e) => setLastName(e.target.value)}
                          value={lastName}
                        />
                      </label>
                    </div>
                    <div>
                      <label className="font-medium text-[0.86rem] flex flex-row gap-[1rem]">
                        <p>Role:</p>
                        <div className="ml-[2.5rem] flex flex-row">
                          <img src="/role.svg" />
                          <p>{UserRoleLabels[user.role]}</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <ImageCropperDialog
        isOpen={ImageCropperDialogOpen}
        onClose={closeImageCropperDialog}
        user={user}
      ></ImageCropperDialog>
    </>
  );
};

export default UpdateUserDialog;
