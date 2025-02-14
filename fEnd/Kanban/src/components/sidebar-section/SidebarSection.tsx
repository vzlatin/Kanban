import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import styles from "./SidebarSection.module.css";
import { Board } from "../../interfaces/data-interfaces";
import { useEffect, useRef } from "react";

type SidebarSectionProps = {
  data: Board[];
  title: string;
};

const SidebarSection: React.FC<SidebarSectionProps> = (
  { data, title },
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionRef.current && !sectionRef.current.contains(event.target as Node)
      ) {
        sectionRef.current.classList.remove(styles["active-section"]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.section}>
      <div
        className={`${styles["section-title-container"]}`}
        onClick={(event) => {
          if (
            (event.target as HTMLElement).closest(
              `.${styles["ellipsis-section"]}`,
            )
          ) {
            event.stopPropagation();
            return;
          }
          sectionRef.current?.classList.toggle(styles["active-section"]);
        }}
      >
        <h2
          className={styles["section-title"]}
        >
          {title}
        </h2>

        <Menu>
          <MenuButton className={styles["ellipsis-section"]}>
            <svg width="24" height="24">
              <use xlinkHref="svg-sprites.svg#ellipsis" />
            </svg>
          </MenuButton>
          <MenuItems
            transition
            anchor="top end"
            className={styles["menu-items"]}
          >
            <MenuItem>
              <div className={styles["menu-item-wrap"]}>
                <button>
                  Add Board
                </button>
                <svg width="24" height="24">
                  <use xlinkHref="svg-sprites.svg#plus" />
                </svg>
              </div>
            </MenuItem>
            <MenuItem>
              <div className={styles["menu-item-wrap"]}>
                <button>
                  Delete Section
                </button>
                <svg>
                  <use xlinkHref="svg-sprites.svg#trashcan" />
                </svg>
              </div>
            </MenuItem>
            <MenuItem>
              <div className={styles["menu-item-wrap"]}>
                <button>
                  Edit Section
                </button>
                <svg>
                  <use xlinkHref="svg-sprites.svg#pencil" />
                </svg>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
      <ul className={styles.board_list}>
        {data.map((board, index) => {
          const isActive = location.pathname.includes(`/board/${board.id}`);
          return (
            <li
              key={index}
              className={`${styles.board_list_item_container} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => {
                navigate(`/board/${board.id}`);
              }}
            >
              {board.title}
              <div
                className={styles["menu-container"]}
              >
                <Menu>
                  <MenuButton className={styles["ellipsis"]}>
                    <svg height="24" width="24">
                      <use xlinkHref="svg-sprites.svg#ellipsis" />
                    </svg>
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="top end"
                    className={styles["menu-items"]}
                  >
                    <MenuItem>
                      <div className={styles["menu-item-wrap"]}>
                        <button>
                          Delete Board
                        </button>
                        <svg>
                          <use xlinkHref="svg-sprites.svg#trashcan" />
                        </svg>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div className={styles["menu-item-wrap"]}>
                        <button>
                          Edit Board
                        </button>
                        <svg>
                          <use xlinkHref="svg-sprites.svg#pencil" />
                        </svg>
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarSection;
