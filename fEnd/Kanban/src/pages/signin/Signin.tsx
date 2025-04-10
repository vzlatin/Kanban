import styles from "./Signin.module.css";

import { useEffect, useState } from "react";
import { checkAuth } from "../../services/user.service";
import { useSigninStore } from "../../state/stores/signin/store";
import { renderErrorToast } from "../../miscellaneous/utils/toasts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ErrorNotification from "../../components/error/ErrorNotification";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signin = useSigninStore((state) => state.signin);
  const error = useSigninStore((state) => state.error);
  const trustDevice = useSigninStore((state) => state.trustDevice);
  const setTrustDevice = useSigninStore((state) => state.setTrustDevice);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      renderErrorToast(<ErrorNotification error={error} />);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <p>Loading Spinner ...</p>
      ) : (
        <div className={styles["signup-container"]}>
          <div className={styles["content-container"]}>
            <div className={styles["signup-static"]}>
              <div className={styles["logo"]}>
                <h1>Kooking Board</h1>
                <img
                  className={styles["logo-image"]}
                  src="/login-signup/logo.svg"
                  alt="Logo Image"
                />
              </div>
              <div className={styles["welcome-text"]}>
                <h1>Welcome to the Sign In page</h1>
                <h3>Please provide your account email and pasword.</h3>

                <p>
                  Don't have an account ? <br />
                  <NavLink to={"/signup"}>Sign up here.</NavLink>
                </p>
              </div>
            </div>
            <div className={styles["form-container"]}>
              <div className={styles["email"]}>
                <label htmlFor="signin-email" className={styles["label-email"]}>
                  Email
                </label>
                <input
                  type="text"
                  id="signin-email"
                  className={styles["email-input"]}
                  autoComplete="on"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className={styles["password"]}>
                <label
                  htmlFor="signin-password"
                  className={styles["label-password"]}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signin-password"
                  className={styles["password-input"]}
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className={styles["trust-device"]}>
                <p>Trust this device</p>
                <input
                  type="checkbox"
                  id="signin-trust-device"
                  className={styles["trust-device-input"]}
                  checked={trustDevice}
                  onChange={(e) => {
                    setTrustDevice(e.target.checked);
                  }}
                />
                <label
                  htmlFor="signin-trust-device"
                  className={styles["label-trust-device"]}
                ></label>
              </div>
              <button
                className={styles["signup-button"]}
                onClick={signinHandler}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  async function signinHandler(e: React.MouseEvent<HTMLButtonElement>) {
    setLoading(true);
    //Validate the input or whatever
    e.preventDefault();

    await signin(email, password);
    setLoading(false);

    if (checkAuth()) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }
  }
};

export default Signin;
