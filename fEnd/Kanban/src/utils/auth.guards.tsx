// import { Navigate } from "react-router-dom";
// import { checkAuth } from "../services/user.service";
// import { ReactNode } from "react";

// interface ProtectedRoutesProps {
// 	children: ReactNode;
// }

// const AuthProtectedRoute: React.FC<ProtectedRoutesProps> = ({ children }) => {
// 	const isAuthenticated = checkAuth();

// 	if (!isAuthenticated) {
// 		return <Navigate to={"/signin"} replace />;
// 	}

// 	return <>{children}</>;
// };

// export default AuthProtectedRoute;
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../pages/signin/store"; // Assuming the store is located here
import { useState, useEffect } from "react";

interface ProtectedRoutesProps {
	children: React.ReactNode;
}

const AuthProtectedRoute: React.FC<ProtectedRoutesProps> = ({ children }) => {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const [loading, setLoading] = useState(true);

	// Wait until authentication state is resolved or loading is complete
	useEffect(() => {
		if (isAuthenticated !== undefined) {
			setLoading(false); // Once the authentication status is determined, stop loading
		}
	}, [isAuthenticated]);

	// While loading, don't render anything
	if (loading) {
		return <div>Loading...</div>; // Or your loading spinner
	}

	// Redirect to sign-in page if not authenticated
	if (!isAuthenticated) {
		return <Navigate to="/signin" replace />;
	}

	return <>{children}</>;
};

export default AuthProtectedRoute;
