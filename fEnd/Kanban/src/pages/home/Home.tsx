import styles from "./Home.module.css";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useKanbanStore } from "./store";

const Home = () => {
	const getSections = useKanbanStore((state) => state.getSections);
	const sections = useKanbanStore((state) => state.sections);

	useEffect(() => {
		getSections();
	}, []);

	return (
		<>
			<Header />
			<div className={styles.content}>
				<Sidebar sections={sections} />
				<Outlet />
			</div>
		</>
	);
};

export default Home;
