import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<>
			<ToastContainer />
			<RouterProvider
				router={router}
				future={{ v7_startTransition: true }}
			></RouterProvider>
		</>
	);
};

export default App;
