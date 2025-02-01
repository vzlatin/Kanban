import { Navigate } from "react-router-dom";
import { useAuthStore } from "../pages/signin/store";
import { useState, useEffect } from "react";

interface ProtectedRoutesProps {
	children: React.ReactNode;
}

const AuthProtectedRoute: React.FC<ProtectedRoutesProps> = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (isAuthenticated !== undefined) {
			setLoading(false);
		}
	}, [isAuthenticated]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" replace />;
	}

	return <>{children}</>;
};

export default AuthProtectedRoute;
