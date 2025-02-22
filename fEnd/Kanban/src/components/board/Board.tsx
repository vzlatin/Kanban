import styles from "./Board.module.css";

import Column from "../column/Column";
import { useParams } from "react-router-dom";
import { useKanbanStore } from "../../state/global.store";

const Board = () => {
  const { boardID } = useParams<{ boardID: string }>();
  if (!boardID) return;

  const id = parseInt(boardID);

  const columns = useKanbanStore((state) => state.columns).filter((column) =>
    column.boardId === id
  );

  return (
    <>
      {/* <h1>Board: {boardID.boardID}</h1> */}
      <div className={styles.board}>
        {columns.map((column) => <Column column={column} key={column.id} />)}
      </div>
    </>
  );
};

export default Board;
