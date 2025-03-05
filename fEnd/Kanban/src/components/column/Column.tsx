import styles from "./Column.module.css";

import Task from "../task/Task";
import { Column as Col } from "../../types/entities";
import { useKanbanStore } from "../../state/stores/global/global.store";
import PopUpMenu from "../menu/PopUpMenu";

type ColumnProps = {
  column: Col;
};

const Column: React.FC<ColumnProps> = ({ column }) => {
  const tasks = useKanbanStore((state) => state.tasks).filter((task) =>
    task.columnId === column.id
  );
  return (
    <div className={styles["container"]}>
      <div className={styles["header"]}>
        <h4 className={styles["column-title"]}>{column.title}</h4>
        <div className={styles["menu-container"]}>
          <PopUpMenu
            buttonClassName={styles["ellipsis"]}
            menuClassName={styles["menu-items"]}
            buttonContent={<img src="/ellipsis-dark.svg" />}
            menuItems={[
              {
                label: "Add a Task",
                icon: "/task.svg",
                onClick: () => console.log("poop"),
              },
              {
                label: "Edit Column",
                icon: "/column-edit.svg",
                onClick: () => console.log("poop"),
              },
              {
                label: "Delete Column",
                icon: "/trashcan.svg",
                onClick: () => console.log("poop"),
              },
            ]}
          >
          </PopUpMenu>
        </div>
      </div>
      <div className={styles["column"]}>
        {tasks.map((task) => <Task task={task} key={task.id} />)}
      </div>
    </div>
  );
};

export default Column;
