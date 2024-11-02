import styles from "./Sidebar.module.css";

import SidebarSection from "../sidebar-section/SidebarSection";
import { useState } from "react";

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState<{
        section: number;
        index: number;
    } | null>(null);

    // This is boilerplate code, actual data to be fetched from the api.
    const sections = [
        {
            title: "Collab Boards",
            data: [
                { id: "1", name: "Design Tasks" },
                { id: "2", name: "Hack CIA" },
                { id: "3", name: "Onboarding Materials" },
                { id: "4", name: "Marketing" },
            ],
        },
        {
            title: "Personal",
            data: [
                { id: "5", name: "Home Renovation" },
                { id: "6", name: "Untiteled" },
            ],
        },
    ];

    return (
        <>
            <div className={styles.sidebar}>
                {sections.map((section, sectionIndex) => (
                    <SidebarSection
                        key={sectionIndex}
                        title={section.title}
                        data={section.data}
                    />
                ))}
            </div>
        </>
    );
};

export default Sidebar;
