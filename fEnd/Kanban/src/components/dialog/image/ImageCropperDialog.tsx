import { Dialog, DialogPanel } from "@headlessui/react";
import ImageCropper from "../../image/ImageCropper";
import { User } from "../../../types/entities";

type ImageCropperDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const ImageCropperDialog: React.FC<ImageCropperDialogProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  return (
    <Dialog open={isOpen} as="div" onClose={onClose} className="absolute z-10">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-background">
        <div className="min-h-screen z-10 flex flex-row justify-center items-center p-[1rem]">
          <DialogPanel
            transition
            className="rounded-[0.5rem] w-[35rem] h-[38rem] bg-background border border-dashed border-accent-blue-100 p-[1.5rem] backdrop-blur-[32px] duration-300 ease-out flex flex-col items-center"
          >
            <div className="flex flex-row items-center gap-[2rem]">
              <ImageCropper user={user} onClose={onClose} />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageCropperDialog;
