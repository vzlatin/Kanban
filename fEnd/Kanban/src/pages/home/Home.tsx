import styles from "./Home.module.css";

import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useKanbanStore } from "../../state/stores/global/global.store";

const Home = () => {
  const sections = useKanbanStore((state) => state.sections);

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
