import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Board from "./components/board/Board";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import AuthProtectedRoute from "./miscellaneous/auth.guards";
import PersistentLogin from "./components/peristent-login/PeristentLogin";
import EmptyBoard from "./components/empty-board/EmptyBoard";
import WebsocketInitializer from "./components/ws-initializer/ws-initializer";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <PersistentLogin>
          <AuthProtectedRoute>
            <WebsocketInitializer />
            <Home />
          </AuthProtectedRoute>
        </PersistentLogin>
      ),
      errorElement: <div>404 Not Found</div>, // This is to be implemented later.
      children: [
        {
          path: "",
          element: <EmptyBoard />,
        },
        {
          path: "/board/:boardID",
          element: <Board />,
        },
      ],
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
