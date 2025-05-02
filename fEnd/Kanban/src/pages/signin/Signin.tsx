import { useEffect, useState } from "react";
import { checkAuth } from "../../services/user.service";
import { useSigninStore } from "../../state/stores/signin/store";
import { renderErrorToast } from "../../miscellaneous/utils/toasts";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ErrorNotification from "../../components/error/ErrorNotification";
import { Switch } from "@headlessui/react";

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
        <div className="h-screen flex flex-row gap-[1rem] justify-center items-center">
          <div className="flex flex-row">
            <div className="flex flex-col gap-[4rem]">
              <div className="flex flex-row gap-[1rem] items-center">
                <h1 className="font-bold text-primary">Kooking Board</h1>
                <img
                  className="w-[10rem] h-[10rem]"
                  src="/login-signup/logo.svg"
                  alt="Logo Image"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="m-0 font-medium text-primary">
                  Welcome to the Sign In page
                </h1>
                <h3 className="m-0 font-light text-primary">
                  Please provide your account email and pasword.
                </h3>

                <p className="text-primary">
                  Don't have an account ? <br />
                  <NavLink to={"/signup"} className="text-accent-blue-200">
                    Sign up here.
                  </NavLink>
                </p>
              </div>
            </div>
            <div className="mt-[2rem] w-[20rem] flex flex-col items-center gap-[2rem]">
              <div className="flex flex-col w-[80%]">
                <label
                  htmlFor="signin-email"
                  className="font-light text-primary"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="signin-email"
                  className="h-[2.5rem] p-[0.4rem] rounded-[0.5rem] appearance-none font-medium bg-background border border-accent-grey-200 inset-shadow-md"
                  autoComplete="on"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col w-[80%]">
                <label
                  htmlFor="signin-password"
                  className="font-light text-primary"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signin-password"
                  className="h-[2.5rem] p-[0.4rem] rounded-[0.5rem] appearance-none font-medium bg-background border border-accent-grey-100 inset-shadow-md"
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-[0.5rem] w-[80%]">
                <p className="text-primary font-light">Trust this device</p>
                <Switch
                  checked={trustDevice}
                  onChange={setTrustDevice}
                  className="group inline-flex h-6 w-11 items-center rounded-full bg-primary transition data-[checked]:bg-accent-blue-200 hover:cursor-pointer"
                >
                  <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
                </Switch>
              </div>
              <button
                className="border-none text-white bg-accent-blue-200 text-[1rem] font-bold mt-[0.78rem] w-[16rem] h-[6rem] rounded-[0.5rem] shadow-md hover:cursor-pointer hover:bg-background hover:text-accent-blue-200 hover:border hover:border-accent-blue-200 active:inset-shadow-md"
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
