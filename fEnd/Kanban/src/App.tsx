import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Board from "./components/board/Board";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <div>404 Not Found</div>, // This is to be implemented later.
        children: [
            {
                path: "",
                element: <div>Please pick a board from the Sidebar</div>, // This is to be implemented later.
            },
            {
                path: "/board/:boardID",
                element: <Board />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

const App = () => {
    return (
        <>
            <RouterProvider router={router}></RouterProvider>
        </>
    );
};

export default App;
