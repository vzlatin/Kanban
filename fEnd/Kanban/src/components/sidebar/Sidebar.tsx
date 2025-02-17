import styles from "./Sidebar.module.css";

import SidebarSection from "../sidebar-section/SidebarSection";
import { Board } from "../../http/interfaces/data-interfaces";

type SidebarProps = {
  sections: {
    id: number;
    title: string;
    boards: Board[];
  }[];
};

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles.sidebar}>
          {sections.map((section) => (
            <SidebarSection
              key={section.id}
              title={section.title}
              data={section.boards}
            />
          ))}
        </div>

        <hr />
        <div className={styles["add-section"]}>
          <button>
            Add a new section
          </button>
          <img src="/board.svg" />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
