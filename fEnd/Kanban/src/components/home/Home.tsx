import styles from "./Home.module.css";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Header />
            <div className={styles.content}>
                <Sidebar />
                <Outlet />
            </div>
        </>
    );
};

export default Home;
