import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { TaskProps } from "../types";
import { validate } from "../validators";
import styles from "../Signup.module.css";

const SignupTask: React.FC<TaskProps> = ({ task, index }) => {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided: DraggableProvided) => {
                return (
                    <div
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <div className={styles["title-container"]}>
                            <div className={styles["task-number"]}>
                                <p>{task.title}</p>
                            </div>
                            <div
                                className={styles["drag-handle"]}
                                {...provided.dragHandleProps}
                            >
                                <p>Drag Me</p>
                            </div>
                        </div>
                        <div className={styles["task-input"]}>
                            <label
                                className={styles.label}
                                htmlFor={task.htmlId}
                            >
                                {task.content}
                            </label>
                            <input
                                value={task.value || ""}
                                className={styles.password}
                                type={task.type}
                                name={task.name}
                                id={task.htmlId}
                                autoComplete="true"
                            />
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
};

export default SignupTask;
