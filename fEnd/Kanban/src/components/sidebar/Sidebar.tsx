import styles from "./Sidebar.module.css";

import SidebarSection from "../sidebar-section/SidebarSection";
import { Board } from "../../interfaces/data-interfaces";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h10v-2H4v-6h18V6c0-1.11-.89-2-2-2m0 4H4V6h16zm4 9v2h-3v3h-2v-3h-3v-2h3v-3h2v3z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
