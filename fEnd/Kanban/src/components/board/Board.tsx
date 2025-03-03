import styles from "./Board.module.css";

import Column from "../column/Column";
import { useParams } from "react-router-dom";
import { useKanbanStore } from "../../state/stores/global/global.store";

const Board = () => {
  const { boardID } = useParams<{ boardID: string }>();
  if (!boardID) return;

  const id = parseInt(boardID);

  const columns = useKanbanStore((state) => state.columns).filter((column) =>
    column.boardId === id
  );
  const numberOfTasks = useKanbanStore((state) => state.tasks).length;

  return (
    <>
      {/* <h1>Board: {boardID.boardID}</h1> */}
      <div className={styles["board"]}>
        <div className={styles["columns"]}>
          {columns.map((column) => <Column column={column} key={column.id} />)}
        </div>
        <div className={styles["stats"]}>
          <div className={styles["col-number"]}>{columns.length} Columns.</div>
          <div className={styles["task-number"]}>{numberOfTasks} Tasks.</div>
          <div className={styles["task-number-unassigned"]}>
            0 Unnasigned Tasks.
          </div>
          <div className={styles["task-number-critical"]}>
            0 Critical Tasks.
          </div>
          <div className={styles["buttons"]}>
            <button className={styles["add-column"]}>Add a new Column</button>
            <img src="/column.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
