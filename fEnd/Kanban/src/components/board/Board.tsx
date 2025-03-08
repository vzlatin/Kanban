import styles from "./Board.module.css";

import Column from "../column/Column";
import { useParams } from "react-router-dom";
import { useKanbanStore } from "../../state/stores/global/global.store";
import AddColumnDialog from "../dialog/column/add/AddColumnDialog";
import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Message, OutboundMessageType } from "../../types/messages";

const Board = () => {
  const { boardID } = useParams<{ boardID: string }>();
  if (!boardID) return;

  const id = parseInt(boardID);

  const columns = useKanbanStore((state) => state.columns).filter((column) =>
    column.boardId === id
  );
  const numberOfTasks = useKanbanStore((state) => state.tasks).length;
  const moveColumn = useKanbanStore((state) => state.moveColumn);
  const send = useKanbanStore((state) => state.send);
  const [isOpen, setIsOpen] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  const addColumn = (title: string): void => {
    const message: Message = {
      type: OutboundMessageType.CreateColumn,
      payload: { title, boardId: id, columnOrder: columns.length },
    };
    send(message);
  };

  return (
    <>
      {/* <h1>Board: {boardID.boardID}</h1> */}
      <div className={styles["board"]}>
        <DragDropContext onDragEnd={dragHandler}>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <div
                className={styles["columns"]}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columns.map((column, index) => (
                  <Column column={column} index={index} key={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className={styles["stats"]}>
          <div className={styles["col-number"]}>{columns.length} Columns.</div>
          <div className={styles["task-number"]}>{numberOfTasks} Tasks.</div>
          <div className={styles["task-number-unassigned"]}>
            {/* TODO: Calculate this number dynamically */}
            0 Unnasigned Tasks.
          </div>
          <div className={styles["task-number-critical"]}>
            {/* TODO: Calculate this number dynamically. Add a criticality property to the Task entity */}
            0 Critical Tasks.
          </div>
          <div className={styles["buttons"]}>
            <button
              className={styles["add-column"]}
              onClick={() => {
                setColumnTitle("");
                setIsOpen(true);
              }}
            >
              Add a new Column
            </button>
            <img src="/column.svg" />
          </div>
        </div>
        <AddColumnDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onChange={(e) => setColumnTitle(e.target.value)}
          columnTitle={columnTitle}
          messageHandler={() => {
            addColumn(columnTitle);
          }}
        >
        </AddColumnDialog>
      </div>
    </>
  );

  function dragHandler(result: DropResult): void {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    moveColumn(source, destination);
  }
};

export default Board;
