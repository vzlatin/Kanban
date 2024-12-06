import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../../pages/signin/store";
import { ApiError } from "../../http/errors";
import ErrorNotification from "../error/ErrorNotification";
import { toast } from "react-toastify";
import { checkAuth } from "../../services/user.service";

interface PersistentLoginProps {
	children: ReactNode;
}

const PersistentLogin: React.FC<PersistentLoginProps> = ({ children }) => {
	const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);
	const loading = useAuthStore((state) => state.loading);
	const error = useAuthStore((state) => state.error);
	const setLoading = useAuthStore((state) => state.setLoading);

	const showErrorNotification = (error: ApiError) => {
		toast(<ErrorNotification error={error} />, {
			className: "error-toast",
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	};

	useEffect(() => {
		setLoading(true);
		!checkAuth() ? refreshAccessToken() : setLoading(false);
	}, []);

	useEffect(() => {
		if (error) {
			showErrorNotification(error);
		}
	}, [error]);

	return <>{loading ? <p>Loading Spinner ...</p> : children}</>;
};

export default PersistentLogin;
