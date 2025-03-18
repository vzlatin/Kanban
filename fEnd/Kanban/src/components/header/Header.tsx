import { useNavigate } from "react-router-dom";
import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";
import UserPill from "../user-pill/UserPill";
import styles from "./Header.module.css";

const Header = () => {
  const users = useKanbanStore((state) => state.users);
  const navigate = useNavigate();
  console.log("Header Rendered");
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
        <div className={styles["profile"]}>
          <PopUpMenu
            buttonClassName={styles["profile-menu-toggle"]}
            menuClassName={styles["profile-menu"]}
            buttonContent={<img src="/user-profile.svg" />}
            menuItems={[
              {
                label: "Profile",
                icon: "/user-profile-menu.svg",
                onClick: () => navigate("/profile"),
              },
              {
                label: "Admin Panel",
                icon: "/admin-panel.svg",
                onClick: () => console.log("poop"),
              },
              {
                label: "Logout",
                icon: "/logout.svg",
                onClick: () => console.log("poop"),
              },
            ]}
          >
          </PopUpMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
