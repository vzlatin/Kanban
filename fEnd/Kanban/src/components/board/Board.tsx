import styles from "./Board.module.css";

import Column from "../column/Column";
import { useParams } from "react-router-dom";

const Board = () => {
    const boardID = useParams<{ boardID: string }>();
    if (!boardID) return <div>Please pick a board</div>;

    return (
        <>
            {/* <h1>Board: {boardID.boardID}</h1> */}
            <div className={styles.board}>
                <Column />
                <Column />
                <Column />
                <Column />
            </div>
        </>
    );
};

export default Board;
