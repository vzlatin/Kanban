import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "../../pages/signin/store";
// import { ApiError } from "../../http/errors";
// import ErrorNotification from "../error/ErrorNotification";
// import { toast } from "react-toastify";
import { checkAuth } from "../../services/user.service";

interface PersistentLoginProps {
	children: ReactNode;
}

const PersistentLogin: React.FC<PersistentLoginProps> = ({ children }) => {
	const [loading, setLoading] = useState(true);

	const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);
	const trustDevice = useAuthStore((state) => state.trustDevice);

	// const showErrorNotification = (error: ApiError) => {
	// 	toast(<ErrorNotification error={error} />, {
	// 		className: "error-toast",
	// 		position: "top-center",
	// 		autoClose: 5000,
	// 		hideProgressBar: true,
	// 		closeOnClick: true,
	// 		pauseOnHover: true,
	// 		draggable: true,
	// 	});
	// };

	useEffect(() => {
		const refresh = async () => {
			try {
				await refreshAccessToken();
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};
		!checkAuth() && trustDevice ? refresh() : setLoading(false);
	}, []);

	// useEffect(() => {
	// 	if (error) {
	// 		showErrorNotification(error);
	// 	}
	// }, [error]);

	return (
		<>
			{!trustDevice ? (
				children
			) : loading ? (
				<p>Loading Spinner ...</p>
			) : (
				children
			)}
		</>
	);
};

export default PersistentLogin;
