import styles from "./Home.module.css";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useKanbanStore } from "../../state/stores/global/global.store";

const Home = () => {
  const getEntities = useKanbanStore((state) => state.getEntityCollection);
  const sections = useKanbanStore((state) => state.sections);

  useEffect(() => {
    getEntities();
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
