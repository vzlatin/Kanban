import styles from "./SidebarSection.module.css";

import PopUpMenu from "../menu/PopUpMenu";
import { Board, Section } from "../../types/entities";
import CustomDialog from "../dialog/CustomDialog";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Message, OutboundMessageType } from "../../types/messages";
import { useKanbanStore } from "../../state/stores/global/global.store";
import AddBoardDialog from "../dialog/board/add/AddBoardDialog";
import UpdateBoardDialog from "../dialog/board/update/UpdateBoardDialog";
import DeleteBoardDialog from "../dialog/board/delete/DeleteBoardDialog";
import UpdateSectionDialog from "../dialog/section/update/UpdateSectionDialog";
import DeleteSectionDialog from "../dialog/section/delete/DeleteSectionDialog";

enum DialogType {
  None = "",
  AddBoard = "addBoard",
  UpdateBoard = "updateBoard",
  DeleteBoard = "deleteBoard",
  UpdateSection = "updateSection",
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
  const [boardTitle, setBoardTitle] = useState("");
  const [trackedBoard, setTrackedBoard] = useState<Board | null>(null);

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

  const addBoard = (title: string): void => {
    const message: Message = {
      type: OutboundMessageType.CreateBoard,
      payload: {
        title,
        section: section.id,
      },
    };
    send(message);
  };

  const updateBoard = (board: Board): void => {
    const message: Message = {
      type: OutboundMessageType.UpdateBoard,
      payload: board,
    };
    send(message);
  };

  const deleteBoard = (board: Board): void => {
    const message: Message = {
      type: OutboundMessageType.DeleteBoard,
      payload: board,
    };
    send(message);
  };

  const updateSection = (section: Section): void => {
    const message: Message = {
      type: OutboundMessageType.UpdateSection,
      payload: section,
    };
    send(message);
  };

  const deleteSection = (section: Section): void => {
    const message: Message = {
      type: OutboundMessageType.DeleteSection,
      payload: section,
    };
    send(message);
  };

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
              onClick: () => {
                setBoardTitle("");
                setIsOpenDialog(DialogType.AddBoard);
              },
            },
            {
              label: "Delete Section",
              icon: "/trashcan.svg",
              onClick: () => setIsOpenDialog(DialogType.DeleteSection),
            },
            {
              label: "Edit Section",
              icon: "/pencil.svg",
              onClick: () => setIsOpenDialog(DialogType.UpdateSection),
            },
          ]}
        >
        </PopUpMenu>
      </div>

      {/* ------- Add Board Dialog ------- */}
      <AddBoardDialog
        isOpen={openDialog === DialogType.AddBoard}
        onClose={closeDialog}
        onChange={(e) => setBoardTitle(e.target.value)}
        boardTitle={boardTitle}
        messageHandler={addBoard}
      >
      </AddBoardDialog>

      {/* ------- Update Board Dialog -------*/}
      <UpdateBoardDialog
        isOpen={openDialog === DialogType.UpdateBoard}
        onClose={closeDialog}
        board={trackedBoard}
        messageHandler={updateBoard}
      >
      </UpdateBoardDialog>

      {/* ------- Delete Board Dialog -------*/}
      <DeleteBoardDialog
        isOpen={openDialog === DialogType.DeleteBoard}
        onClose={closeDialog}
        board={trackedBoard}
        messageHandler={deleteBoard}
      >
      </DeleteBoardDialog>

      {/* ------- Edit Section Dialog -------*/}
      <UpdateSectionDialog
        isOpen={openDialog === DialogType.UpdateSection}
        onClose={closeDialog}
        section={section}
        messageHandler={updateSection}
      >
      </UpdateSectionDialog>

      {/* ------- Delete Section Dialog -------*/}
      <DeleteSectionDialog
        isOpen={openDialog === DialogType.DeleteSection}
        onClose={closeDialog}
        section={section}
        messageHandler={deleteSection}
      >
      </DeleteSectionDialog>

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
                      label: "Edit Board",
                      icon: "/pencil.svg",
                      onClick: () => {
                        setTrackedBoard(board);
                        setBoardTitle(board.title);
                        setIsOpenDialog(DialogType.UpdateBoard);
                      },
                    },
                    {
                      label: "Delete Board",
                      icon: "/trashcan.svg",
                      onClick: () => {
                        setTrackedBoard(board);
                        setIsOpenDialog(DialogType.DeleteBoard);
                      },
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
};

export default SidebarSection;
