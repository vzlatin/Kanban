import { Column as Col } from "../../http/interfaces/data-interfaces";
import Task from "../task/Task";
import styles from "./Column.module.css";

type ColumnProps = {
  column: Col;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div>
      <h4 className={styles["column-title"]}>{column.title}</h4>
      <div className={styles.column}>
        {column.tasks.map((task) => <Task task={task} key={task.id} />)}
      </div>
    </div>
  );
};

export default Column;
