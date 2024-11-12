import { useSortable } from "@dnd-kit/sortable";
import { TaskProps } from "../types";
import { CSS } from "@dnd-kit/utilities";

const LoginTask: React.FC<TaskProps> = ({ task, styles }) => {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({ id: task.id, data: { type: "task" } });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            className={styles.task}
        >
            <div className={styles["task-number"]}>
                <p>{task.title}</p>
            </div>
            <div className={styles["task-input"]}>
                <label className={styles.label} htmlFor={task.htmlId}>
                    {task.content}
                </label>
                <input
                    className={styles.password}
                    type={task.type}
                    name={task.name}
                    id={task.htmlId}
                    autoComplete="true"
                />
            </div>
        </div>
    );
};

export default LoginTask;
