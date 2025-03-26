import localstyles from "./UpdateUserDialog.module.css";
import styles from "../CustomDialog.module.css";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { User, UserRoleLabels } from "../../../types/entities";
import { useKanbanStore } from "../../../state/stores/global/global.store";

type UpdateUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
};

const UpdateUserDialog: React.FC<UpdateUserDialogProps> = (
  { isOpen, onClose, user },
) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const changeProfilePicture = useKanbanStore((state) =>
    state.changeUserProfilePic
  );

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    const form = new FormData();
    for (const file of files) {
      form.append(`${e.target.getAttribute("name")}`, file);
    }
    await changeProfilePicture(form);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className={styles.dialog}
      onClose={onClose}
    >
      <div className={styles["dialog-overlay"]}>
        <div className={styles["dialog-panel-wrapper"]}>
          <DialogPanel transition className={localstyles["dialog-panel"]}>
            <div className={styles["dialog-description"]}>
              <div className={localstyles["personal-info-container"]}>
                <div className={localstyles["profile-image-container"]}>
                  {user.profileImageUrl
                    ? (
                      <img
                        className={localstyles["profile-image"]}
                        src={user.profileImageUrl}
                      />
                    )
                    : (
                      <img
                        className={localstyles["profile-image"]}
                        src="/user-profile.svg"
                      />
                    )}
                  <label className={localstyles["update-profile-image"]}>
                    <input
                      type="file"
                      name="profile-image"
                      onChange={(e) => uploadFile(e)}
                    />
                    Change profile image
                  </label>
                </div>
                <div className={localstyles["personal-info"]}>
                  <div className={localstyles["first-name"]}>
                    <label className={localstyles["label"]}>
                      <p>First Name:</p>
                      <input
                        name="first-name"
                        className={localstyles["dialog-description-input"]}
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={firstName}
                      />
                    </label>
                  </div>
                  <div className={localstyles["last-name"]}>
                    <label className={localstyles["label"]}>
                      <p>Last Name:</p>
                      <input
                        className={localstyles["dialog-description-input"]}
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                      />
                    </label>
                  </div>
                  <div>
                    <label className={localstyles["label"]}>
                      <p>Role:</p>
                      <div className={localstyles["role"]}>
                        <img src="role.svg" />
                        <p>{UserRoleLabels[user.role]}</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className={localstyles["buttons"]}>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateUserDialog;
