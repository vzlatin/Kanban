import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { ColumnProps } from "../types";
import LoginTask from "./LoginTask";

const LoginColumn: React.FC<ColumnProps> = ({ column, styles }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <SortableContext
            id={column.id}
            items={column.tasks.map((task) => task.id)}
            strategy={rectSortingStrategy}
        >
            <div ref={setNodeRef}>
                <p>{column.title}</p>
                <div className={styles["work-in-progress"]}>
                    {column.tasks.map((task) => {
                        return (
                            <LoginTask
                                key={task.id}
                                task={task}
                                styles={styles}
                            />
                        );
                    })}
                </div>
            </div>
        </SortableContext>
    );
};

export default LoginColumn;
