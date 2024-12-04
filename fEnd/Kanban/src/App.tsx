import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
	return (
		<>
			<RouterProvider
				router={router}
				future={{ v7_startTransition: true }}
			></RouterProvider>
		</>
	);
};

export default App;
