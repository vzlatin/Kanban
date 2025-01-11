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
			<h3>Sections</h3>
			<div className={styles.sidebar}>
				{sections.map((section) => (
					<SidebarSection
						key={section.id}
						title={section.title}
						data={section.boards}
					/>
				))}
			</div>
		</>
	);
};

export default Sidebar;
