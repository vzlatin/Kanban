import styles from "./SignupColumn.module.css";

import SignupTask from "../signup-task/SignupTask";
import { ColumnProps } from "../../../../state/stores/signup/types";
import {
	Droppable,
	DroppableProvided,
	DroppableStateSnapshot,
} from "@hello-pangea/dnd";

const SignupColumn: React.FC<ColumnProps> = ({ column }) => {
	return (
		<div>
			<p className={styles["column-title"]}>{column.title}</p>
			<Droppable droppableId={column.id}>
				{(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
					return (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							className={styles[`${column.id}`]}
							style={
								snapshot.isDraggingOver
									? { border: "0.063rem var(--color-font) dashed" }
									: {}
							}
						>
							{column.taskIds.map((taskId, index) => {
								return (
									<SignupTask key={taskId} taskId={taskId} index={index} />
								);
							})}
							{provided.placeholder}
						</div>
					);
				}}
			</Droppable>
		</div>
	);
};

export default SignupColumn;
