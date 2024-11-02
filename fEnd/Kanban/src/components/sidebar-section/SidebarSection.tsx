import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./SidebarSection.module.css";

type SidebarSectionProps = {
    data: { id: string; name: string }[];
    title: string;
};

const SidebarSection: React.FC<SidebarSectionProps> = ({ data, title }) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className={styles.section}>
            <h2 className={styles.section_title}>{title}</h2>
            <ul className={styles.board_list}>
                {data.map((board, index) => {
                    const isActive = location.pathname.includes(
                        `/board/${board.id}`
                    );
                    return (
                        <li
                            key={index}
                            className={`${styles.board_list_item_container} ${
                                isActive ? styles.active : ""
                            }`}
                            onClick={() => navigate(`/board/${board.id}`)}
                        >
                            <Link
                                to={`/board/${board.id}`}
                                className={styles.board_list_item}
                            >
                                {board.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default SidebarSection;
