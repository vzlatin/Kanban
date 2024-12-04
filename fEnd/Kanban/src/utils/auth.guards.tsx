import { Navigate } from "react-router-dom";
import { checkAuth } from "../services/user.service";
import { ReactNode } from "react";

interface ProtectedRoutesProps {
	children: ReactNode;
}

const AuthProtectedRoute: React.FC<ProtectedRoutesProps> = ({ children }) => {
	const isAuthenticated = checkAuth();
	console.log(isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to={"/signin"} replace />;
	}

	return <>{children}</>;
};

export default AuthProtectedRoute;
