import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";
import UserPill from "../user-pill/UserPill";
import styles from "./Header.module.css";

import { useEffect, useRef, useState } from "react";

const Header = () => {
  const users = useKanbanStore((state) => state.users);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  //const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target instanceof HTMLAnchorElement) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

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
                onClick: () => console.log("poop"),
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

        {
          /*
        <div className={styles["profile"]} ref={menuRef}>
          <div className={styles["profile-image"]} onClick={toggleMenu}>
            <img
              className={styles["profile-icon"]}
              src="/user-profile.svg"
            />
          </div>
          {showMenu
            ? (
              <div
                className={styles["profile-menu"]}
                onClick={(e) => {
                  handleMenuClick(e);
                }}
              >
                <a className={styles["menu-item"]}>Profile</a>
                <a className={styles["menu-item"]}>Log Out</a>
                <a className={styles["menu-item"]}>Something</a>
                <a className={styles["menu-item"]}>Something Else</a>
              </div>
            )
            : null}
        </div>
        */
        }
      </div>
    </>
  );
};

export default Header;
