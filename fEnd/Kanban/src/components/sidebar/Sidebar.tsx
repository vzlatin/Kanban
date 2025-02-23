import styles from "./Sidebar.module.css";

import { Section } from "../../types/entities";
import SidebarSection from "../sidebar-section/SidebarSection";

type SidebarProps = {
  sections: Section[];
};

const Sidebar: React.FC<SidebarProps> = ({ sections }) => {
  return (
    <>
      <div className={styles["container"]}>
        <div className={styles.sidebar}>
          {sections.map((section) => (
            <SidebarSection
              key={section.id}
              id={section.id}
              title={section.title}
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
