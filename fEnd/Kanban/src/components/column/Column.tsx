import styles from "./Column.module.css";

import Task from "../task/Task";
import { Column as Col } from "../../types/entities";
import { useKanbanStore } from "../../state/stores/global/global.store";

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
