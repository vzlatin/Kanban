import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "../../pages/signin/store";
import { checkAuth } from "../../services/user.service";

interface PersistentLoginProps {
  children: ReactNode;
}

const PersistentLogin: React.FC<PersistentLoginProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);
  const trustDevice = useAuthStore((state) => state.trustDevice);

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

  return (
    <>
      {!trustDevice
        ? children
        : loading
        ? <p>Loading Spinner ...</p>
        : children}
    </>
  );
};

export default PersistentLogin;
