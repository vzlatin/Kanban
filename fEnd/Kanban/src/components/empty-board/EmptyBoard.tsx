import styles from "./EmptyBoard.module.css";

const PickBoard = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["no-board-selected"]}>
        Please select a board from the sidebard
      </div>
    </div>
  );
};

export default PickBoard;
