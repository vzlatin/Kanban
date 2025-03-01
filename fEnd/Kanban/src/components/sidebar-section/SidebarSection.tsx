import styles from "./SidebarSection.module.css";

import PopUpMenu from "../menu/PopUpMenu";
import { Section } from "../../types/entities";
import CustomDialog from "../dialog/CustomDialog";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Message, OutboundMessageType } from "../../types/messages";
import { useKanbanStore } from "../../state/stores/global/global.store";

enum DialogType {
  None = "",
  AddBoard = "addBoard",
  EditSection = "editSection",
  DeleteSection = "deleteSection",
}

const SidebarSection: React.FC<Section> = (
  section,
) => {
  const location = useLocation();
  const navigate = useNavigate();

  const boards = useKanbanStore((state) => state.boards).filter((board) =>
    board.section === section.id
  );
  const send = useKanbanStore((state) => state.send);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [openDialog, setIsOpenDialog] = useState<DialogType>(DialogType.None);
  const [sectionTitle, setSectionTitle] = useState(section.title);

  const closeDialog = () => setIsOpenDialog(DialogType.None);

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
          {section.title}
        </h2>

        <PopUpMenu
          buttonClassName={styles["ellipsis-section"]}
          menuClassName={styles["menu-items"]}
          buttonContent={<img src="/ellipsis-dark.svg" />}
          menuItems={[
            {
              label: "Add Board",
              icon: "/plus.svg",
              onClick: () => console.log("Add Board clicked"),
            },
            {
              label: "Delete Section",
              icon: "/trashcan.svg",
              onClick: () => setIsOpenDialog(DialogType.DeleteSection),
            },
            {
              label: "Edit Section",
              icon: "/pencil.svg",
              onClick: () => setIsOpenDialog(DialogType.EditSection),
            },
          ]}
        >
        </PopUpMenu>
      </div>

      {/* ------- Edit Section Dialog -------*/}
      <CustomDialog
        isOpen={openDialog === DialogType.EditSection}
        onClose={closeDialog}
        title="Edit Section"
      >
        <input
          className={styles["dialog-description-input"]}
          type="text"
          placeholder="Section Title"
          onChange={(e) => setSectionTitle(e.target.value)}
          value={sectionTitle}
        />
        <div className={styles["buttons"]}>
          <button
            className={`${
              sectionTitle === section.title || sectionTitle === ""
                ? styles["button-disabled"]
                : styles["buttons-ok"]
            }`}
            disabled={sectionTitle === section.title || sectionTitle === ""}
            onClick={() => {
              updateSection({
                ...section,
                title: sectionTitle,
              });
              closeDialog();
            }}
          >
            Edit
          </button>
          <button
            className={styles["buttons-nok"]}
            onClick={closeDialog}
          >
            Cancel
          </button>
        </div>
      </CustomDialog>

      {/* ------- Delete Section Dialog -------*/}
      <CustomDialog
        isOpen={openDialog === DialogType.DeleteSection}
        onClose={closeDialog}
        title="Delete Section"
      >
        <p className={styles["dialog-warning"]}>
          Deleting a Section will result in the deletion of all of its
          associated data (Board, Columns, Tasks, etc.) Do you want to proceed?
        </p>
        <div className={styles["buttons"]}>
          <button
            className={styles["buttons-ok-delete"]}
            onClick={() => {
              deleteSection(section);
              closeDialog();
            }}
          >
            Delete
          </button>
          <button
            className={styles["buttons-nok-delete"]}
            onClick={closeDialog}
          >
            Cancel
          </button>
        </div>
      </CustomDialog>

      <ul className={styles.board_list}>
        {boards.map((board, index) => {
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
                <PopUpMenu
                  buttonClassName={styles["ellipsis"]}
                  menuClassName={styles["menu-items"]}
                  buttonContent={<img src="/ellipsis-light.svg" />}
                  menuItems={[
                    {
                      label: "Delete Board",
                      icon: "/trashcan.svg",
                      onClick: () => console.log("Delete Board clicked"),
                    },
                    {
                      label: "Edit Board",
                      icon: "/pencil.svg",
                      onClick: () => console.log("Edit Board Clicked"),
                    },
                  ]}
                >
                </PopUpMenu>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  function updateSection(section: Section): void {
    const message: Message = {
      type: OutboundMessageType.UpdateSection,
      payload: section,
    };
    send(message);
  }

  function deleteSection(section: Section): void {
    const message: Message = {
      type: OutboundMessageType.DeleteSection,
      payload: section,
    };
    send(message);
  }
};

export default SidebarSection;
