import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const placeholder = Array.from({ length: 6 }, (_, i) => i);
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = () => setShowMenu((prev) => !prev);

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
            {placeholder.map((_, i) => {
              return (
                <div key={i} className={styles["member"]}>
                  <img src="user-profile.svg" alt="user photo" />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles["profile"]} ref={menuRef}>
          <div className={styles["profile-image"]} onClick={toggleMenu}>
            <img className={styles["profile-icon"]} src="user-profile.svg" />
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
      </div>
    </>
  );
};

export default Header;
