import { Column as Col } from "../../state/types";
import Task from "../task/Task";
import styles from "./Column.module.css";
import { useKanbanStore } from "../../state/global.store";

type ColumnProps = {
  column: Col;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  const tasks = useKanbanStore((state) => state.tasks).filter((task) =>
    task.columnId === column.id
  );
  return (
    <div>
      <h4 className={styles["column-title"]}>{column.title}</h4>
      <div className={styles.column}>
        {tasks.map((task) => <Task task={task} key={task.id} />)}
      </div>
    </div>
  );
};

export default Column;
