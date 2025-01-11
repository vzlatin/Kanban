import styles from "./Board.module.css";

import Column from "../column/Column";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useKanbanStore } from "../../pages/home/store";

const Board = () => {
	const { boardID } = useParams<{ boardID: string }>();
	if (!boardID) return <div>Please pick a board</div>;

	const id = parseInt(boardID);

	const getColumns = useKanbanStore((state) => state.getColumns);
	const columns = useKanbanStore((state) => state.columns);

	useEffect(() => {
		getColumns(id);
	}, []);

	return (
		<>
			{/* <h1>Board: {boardID.boardID}</h1> */}
			<div className={styles.board}>
				{columns.map((column) => (
					<Column column={column} key={column.id} />
				))}
			</div>
		</>
	);
};

export default Board;
