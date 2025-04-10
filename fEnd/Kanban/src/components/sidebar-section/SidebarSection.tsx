import PopUpMenu from "../menu/PopUpMenu";
import { Board, Section } from "../../types/entities";
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

const SidebarSection: React.FC<Section> = (section) => {
  const location = useLocation();
  const navigate = useNavigate();

  const boards = useKanbanStore((state) => state.boards).filter(
    (board) => board.section === section.id,
  );
  const send = useKanbanStore((state) => state.send);

  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionMenuRef = useRef<HTMLDivElement>(null);
  const [openDialog, setIsOpenDialog] = useState<DialogType>(DialogType.None);
  const [boardTitle, setBoardTitle] = useState("");
  const [trackedBoard, setTrackedBoard] = useState<Board | null>(null);
  const [activeSection, setActiveSection] = useState(false);

  const closeDialog = () => setIsOpenDialog(DialogType.None);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(event.target as Node) &&
        sectionMenuRef.current &&
        !sectionMenuRef.current.contains(event.target as Node)
      ) {
        setActiveSection(false);
        console.log(activeSection);
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
    <div ref={sectionRef}>
      <div
        className="flex flex-row gap-[0.3rem] hover:cursor-pointer items-center"
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("#section-menu")) {
            event.stopPropagation();
            return;
          }
          setActiveSection(true);
        }}
      >
        <h2
          className={`${activeSection && "text-primary"} text-accent-grey-200 font-medium text-[3rem] ml-[1.625rem] hover:cursor-pointer hover:text-primary`}
        >
          {section.title}
        </h2>

        <div
          id="section-menu"
          ref={sectionMenuRef}
          className={`mr-[0.3rem] ml-auto flex flex-row justify-center ${!activeSection && "invisible"}`}
        >
          <PopUpMenu
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
          ></PopUpMenu>
        </div>
      </div>

      <ul className="list-none m-0 p-0 font-medium text-[1.5rem]">
        {boards.map((board, index) => {
          const isActive = location.pathname.includes(`/board/${board.id}`);
          return (
            <li
              key={index}
              className={`${isActive && "text-accent-blue-200 outline outline-accent-blue-200 rounded-r-[0.5rem]"} py-[0.5rem] pl-[1rem] my-[0.3rem] mr-[0.1rem] text-primary flex flex-row items-center hover:outline hover:outline-accent-blue-200 hover:text-accent-blue-200 hover:rounded-r-[0.5rem] hover:cursor-pointer`}
              onClick={() => {
                navigate(`/board/${board.id}`);
              }}
            >
              {board.title}
              <div
                id="board-menu"
                className={`${!isActive && "hidden"} mr-[0.3rem] ml-auto items-center flex flex-row`}
              >
                <PopUpMenu
                  buttonContent={<img src="/ellipsis-dark.svg" />}
                  menuItems={[
                    {
                      label: "Edit Board",
                      icon: "/pencil.svg",
                      onClick: () => {
                        setTrackedBoard(board);
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
                ></PopUpMenu>
              </div>
            </li>
          );
        })}
      </ul>

      {/* ------- Add Board Dialog ------- */}
      <AddBoardDialog
        isOpen={openDialog === DialogType.AddBoard}
        onClose={closeDialog}
        onChange={(e) => setBoardTitle(e.target.value)}
        boardTitle={boardTitle}
        messageHandler={addBoard}
      ></AddBoardDialog>

      {/* ------- Update Board Dialog -------*/}
      <UpdateBoardDialog
        isOpen={openDialog === DialogType.UpdateBoard}
        onClose={closeDialog}
        board={trackedBoard}
        messageHandler={updateBoard}
      ></UpdateBoardDialog>

      {/* ------- Delete Board Dialog -------*/}
      <DeleteBoardDialog
        isOpen={openDialog === DialogType.DeleteBoard}
        onClose={closeDialog}
        board={trackedBoard}
        messageHandler={deleteBoard}
      ></DeleteBoardDialog>

      {/* ------- Edit Section Dialog -------*/}
      <UpdateSectionDialog
        isOpen={openDialog === DialogType.UpdateSection}
        onClose={closeDialog}
        section={section}
        messageHandler={updateSection}
      ></UpdateSectionDialog>

      {/* ------- Delete Section Dialog -------*/}
      <DeleteSectionDialog
        isOpen={openDialog === DialogType.DeleteSection}
        onClose={closeDialog}
        section={section}
        messageHandler={deleteSection}
      ></DeleteSectionDialog>
    </div>
  );
};

export default SidebarSection;
