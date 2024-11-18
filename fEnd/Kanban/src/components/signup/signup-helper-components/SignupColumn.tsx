import SignupTask from "./SignupTask";
import styles from "../Signup.module.css";
import { ColumnProps } from "../types";
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
                {(
                    provided: DroppableProvided,
                    snapshot: DroppableStateSnapshot
                ) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={styles[`${column.id}`]}
                            style={
                                snapshot.isDraggingOver
                                    ? { border: "0.063rem #44476a dashed" }
                                    : {}
                            }
                        >
                            {column.tasks.map((task, index) => {
                                return (
                                    <SignupTask
                                        key={task.id}
                                        task={task}
                                        index={index}
                                    />
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
