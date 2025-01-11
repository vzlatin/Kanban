import styles from "./Task.module.css";
import { Task as T } from "../../interfaces/data-interfaces";

type TaskProps = {
	task: T;
};

const Task: React.FC<TaskProps> = ({ task }) => {
	return <div className={styles.task}>{task.title}</div>;
};

export default Task;
