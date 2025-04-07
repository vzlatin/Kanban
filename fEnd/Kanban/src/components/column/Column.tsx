import styles from "./Column.module.css";

import Task from "../task/Task";
import { Column as Col } from "../../types/entities";
import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import UpdateColumnDialog from "../dialog/column/update/UpdateColumnDialog";
import { Message, OutboundMessageType } from "../../types/messages";
import DeleteColumnDialog from "../dialog/column/delete/DeleteColumnDialog";

type ColumnProps = {
  column: Col;
  index: number;
};

enum DialogType {
  None = "",
  AddTask = "addTask",
  UpdateColumn = "updateColumn",
  DeleteColumn = "deleteColumn",
}

const Column: React.FC<ColumnProps> = ({ column, index }) => {
  const tasks = useKanbanStore((state) => state.tasks).filter(
    (task) => task.columnId === column.id,
  );
  const send = useKanbanStore((state) => state.send);

  const [openDialog, setIsOpenDialog] = useState<DialogType>(DialogType.None);
  const closeDialog = () => setIsOpenDialog(DialogType.None);

  const updateColumn = (column: Col): void => {
    const message: Message = {
      type: OutboundMessageType.UpdateColumn,
      payload: column,
    };
    send(message);
  };

  const deleteColumn = (column: Col): void => {
    const message: Message = {
      type: OutboundMessageType.DeleteColumn,
      payload: column,
    };
    send(message);
  };

  return (
    <>
      <Draggable
        draggableId={column.id.toString()}
        index={index}
        key={column.id}
      >
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div>
              <div
                className="flex flex-row items-center mt-[0.8rem]"
                {...provided.dragHandleProps}
              >
                <h4 className="font-medium text-[1rem]">{column.title}</h4>
                <div className="flex items-center w-[1.5rem] h-[1.5rem] mr-4 ml-auto my-0">
                  <PopUpMenu
                    buttonContent={<img src="/ellipsis-dark.svg" />}
                    menuItems={[
                      {
                        label: "Add a Task",
                        icon: "/task.svg",
                        onClick: () => console.log("poop"),
                      },
                      {
                        label: "Edit Column",
                        icon: "/column-edit.svg",
                        onClick: () => setIsOpenDialog(DialogType.UpdateColumn),
                      },
                      {
                        label: "Delete Column",
                        icon: "/trashcan.svg",
                        onClick: () => setIsOpenDialog(DialogType.DeleteColumn),
                      },
                    ]}
                  ></PopUpMenu>
                </div>
              </div>
              <div className="min-h-40 w-60 my-2 p-2 flex-shrink-0 rounded-lg flex flex-col items-center gap-4">
                {tasks.map((task) => (
                  <Task task={task} key={task.id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <UpdateColumnDialog
        isOpen={openDialog === DialogType.UpdateColumn}
        onClose={closeDialog}
        column={column}
        messageHandler={updateColumn}
      ></UpdateColumnDialog>

      <DeleteColumnDialog
        isOpen={openDialog === DialogType.DeleteColumn}
        onClose={closeDialog}
        column={column}
        messageHandler={deleteColumn}
      ></DeleteColumnDialog>
    </>
  );
};

export default Column;
