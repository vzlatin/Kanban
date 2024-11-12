import Task from "../task/Task";
import styles from "./Column.module.css";

const Column = () => {
    return (
        <div>
            <h4 className={styles["column-title"]}>Column Title</h4>
            <div className={styles.column}>
                <Task />
                <Task />
                <Task />
            </div>
        </div>
    );
};

export default Column;
