import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSigninStore } from "../../state/stores/signin/store";

interface ProtectedRoutesProps {
	children: React.ReactNode;
}

const AuthProtectedRoute: React.FC<ProtectedRoutesProps> = ({ children }) => {
	const isAuthenticated = useSigninStore((state) => state.isAuthenticated);
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
