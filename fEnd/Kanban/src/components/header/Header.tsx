import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";
import UserPill from "../user-pill/UserPill";
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
      <div className="h-[3.125rem] w-100% px-[1rem] flex flex-row gap-[10rem] items-center">
        <div className="w-[15rem] flex flex-row">
          <input
            type="text"
            className="h-[2.5rem] py-[0.4rem] pr-[0.4rem] pl-[2rem] rounded-[0.5rem] appearance-none font-medium bg-background bg-[url(/search.svg)] bg-no-repeat bg-position-[0.5rem] border border-accent-grey-100 inset-shadow-md focus:border focus:border-accent-blue-200"
            placeholder="Search"
          />
        </div>
        <div className="flex">
          <div className="flex flex-row content-center gap-[1rem]">
            {users.map((user, index) => (
              <UserPill user={user} key={index}></UserPill>
            ))}
          </div>
        </div>
        <div className="ml-auto">
          <PopUpMenu
            buttonContent={
              <img
                className="p-[0.5rem] rounded-[0.52rem]"
                src="/user-profile.svg"
              />
            }
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
          ></PopUpMenu>
        </div>
      </div>
      <UpdateUserDialog
        isOpen={openDialog === DialogType.Profile}
        onClose={closeDialog}
        user={currentUser}
      ></UpdateUserDialog>
    </>
  );
};

export default Header;
