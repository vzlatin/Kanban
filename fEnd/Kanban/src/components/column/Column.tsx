import styles from "./Column.module.css";

import Task from "../task/Task";
import { Column as Col } from "../../types/entities";
import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import UpdateColumnDialog from "../dialog/column/update/UpdateColumnDialog";
import { Message, OutboundMessageType } from "../../types/messages";

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
  const tasks = useKanbanStore((state) => state.tasks).filter((task) =>
    task.columnId === column.id
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

  return (
    <>
      <Draggable
        draggableId={column.id.toString()}
        index={index}
        key={column.id}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className={styles["container"]}>
              <div className={styles["header"]} {...provided.dragHandleProps}>
                <h4 className={styles["column-title"]}>{column.title}</h4>
                <div className={styles["menu-container"]}>
                  <PopUpMenu
                    buttonClassName={styles["ellipsis"]}
                    menuClassName={styles["menu-items"]}
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
                        onClick: () => console.log("poop"),
                      },
                    ]}
                  >
                  </PopUpMenu>
                </div>
              </div>
              <div className={styles["column"]}>
                {tasks.map((task) => <Task task={task} key={task.id} />)}
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
      >
      </UpdateColumnDialog>
    </>
  );
};

export default Column;
