import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";
import UserPill from "../user-pill/UserPill";
import styles from "./Header.module.css";
import UpdateUserDialog from "../dialog/user/UpdateUserDialog";
import { useState } from "react";
import { useSigninStore } from "../../state/stores/signin/store";
import { useNavigate } from "react-router-dom";
import { Message, OutboundMessageType } from "../../types/messages";

enum DialogType {
  None = "",
  Profile = "profile",
  AdminPanel = "adminPanel",
  Logout = "logout",
}

const Header = () => {
  const users = useKanbanStore((state) => state.users);
  const currentUser = useSigninStore((state) => state.user);
  const logout = useSigninStore((state) => state.logout);
  const send = useKanbanStore((state) => state.send);
  const [openDialog, setIsOpenDialog] = useState<DialogType>(DialogType.None);
  const closeDialog = () => setIsOpenDialog(DialogType.None);
  const navigate = useNavigate();

  const userLogout = async () => {
    const message: Message = {
      type: OutboundMessageType.DisconnectUser,
      payload: null,
    };
    send(message);
    await logout();
    navigate("/signin");
  };

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["search"]}>
          <input
            type="text"
            className={styles["search-input"]}
            placeholder="Search"
          />
        </div>
        <div className={styles["team"]}>
          <div className={styles["team-members"]}>
            {users.map((user, index) => (
              <UserPill user={user} key={index}></UserPill>
            ))}
          </div>
        </div>
        <PopUpMenu
          buttonClassName={styles["profile"]}
          menuClassName={styles["profile-menu"]}
          buttonContent={<img src="/user-profile.svg" />}
          menuItems={[
            {
              label: "Profile",
              icon: "/user-profile-menu.svg",
              onClick: () => setIsOpenDialog(DialogType.Profile),
            },
            {
              label: "Admin Panel",
              icon: "/admin-panel.svg",
              onClick: () => console.log("poop"),
            },
            {
              label: "Logout",
              icon: "/logout.svg",
              onClick: () => {
                userLogout();
              },
            },
          ]}
        >
        </PopUpMenu>
      </div>
      <UpdateUserDialog
        isOpen={openDialog === DialogType.Profile}
        onClose={closeDialog}
        user={currentUser}
      >
      </UpdateUserDialog>
    </>
  );
};

export default Header;
