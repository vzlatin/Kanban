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

  const columns = useKanbanStore((state) => state.columns)
    .filter((column) => column.boardId === id)
    .sort((a, b) => a.columnOrder - b.columnOrder);
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
      <div className="flex flex-col w-100%">
        <DragDropContext onDragEnd={dragHandler}>
          <Droppable droppableId="columns" direction="horizontal">
            {(provided) => (
              <div
                className="max-h-[37.5rem] min-h-[37.5rem] overflow-y-scroll overflow-x-auto my-[1.625rem] px-[0.635rem] flex flex-row gap-[0.625rem]"
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
        <div className="flex flex-row items-center gap-[2rem] ml-[0.625rem] mt-[0.8rem] font-medium text-[1.2rem]">
          <div>{columns.length} Columns.</div>
          <div>{numberOfTasks} Tasks.</div>
          <div>
            {/* TODO: Calculate this number dynamically */}0 Unnasigned Tasks.
          </div>
          <div>
            {/* TODO: Calculate this number dynamically. Add a criticality property to the Task entity */}
            0 Critical Tasks.
          </div>
          <div className="flex flex-row items-center ml-[1.5rem] p-[0.4rem] transform-transform duration-100 ease-in rounded-[0.5rem] border border-accent-blue-200 hover:shadow-md hover:cursor-pointer hover:scale-[1.03] active:shadow-none active:inset-shadow-md">
            <button
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
        ></AddColumnDialog>
      </div>
    </>
  );

  function dragHandler(result: DropResult): void {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    moveColumn(source, destination, id);
  }
};

export default Board;
