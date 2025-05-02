import { useEffect, useState } from "react";
import { UserRole } from "../../types/entities";
import { checkAuth } from "../../services/user.service";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSignupStore } from "../../state/stores/signup/store";
import { useSigninStore } from "../../state/stores/signin/store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ErrorNotification from "../../components/error/ErrorNotification";
import SignupColumn from "./signup-helper-components/signup-column/SignupColumn";
import {
  renderErrorToast,
  renderInfoToast,
} from "../../miscellaneous/utils/toasts";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const columns = useSignupStore((state) => state.columns);
  const moveTask = useSignupStore((state) => state.moveTask);
  const tasks = useSignupStore((state) => state.tasks);

  const signup = useSigninStore((state) => state.signup);
  const error = useSigninStore((state) => state.error);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      renderErrorToast(<ErrorNotification error={error} />);
    }
  }, [error]);

  //TODO: Make a better spinner here
  return (
    <>
      {loading ? (
        <p>Loading Spinner ...</p>
      ) : (
        <div className="h-screen flex flex-row gap-4 justify-center items-center">
          <div className="flex flex-row">
            <div className="flex flex-col gap-16">
              <div className="flex flex-row gap-4 items-center">
                <h1 className="font-bold text-primary text-4xl">
                  Kooking Board
                </h1>
                <img
                  className="h-40 w-40"
                  src="/login-signup/logo.svg"
                  alt="Logo Image"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="m-0 font-medium text-primary text-2xl">
                  Welcome to the Sign Up page
                </h1>
                <h3 className="m-0 font-light text-primary">
                  Complete the tasks and drag them to the Done
                  <br />
                  column to proceed with the sign up.
                </h3>

                <p className="text-primary font-medium">
                  Already have an account ? <br />
                  <NavLink
                    to={"/signin"}
                    className="text-primary font-bold hover:text-accent-blue-200"
                  >
                    Sign in here.
                  </NavLink>
                </p>
                <button
                  className="border-none text-white bg-accent-blue-200 text-base font-bold mt-[0.78rem] w-72 h-24 rounded-[0.5rem] shadow-md hover:cursor-pointer hover:text-accent-blue-200 hover:bg-background hover:border-accent-blue-200 active:shadow-none active:inset-shadow-md"
                  onClick={signupHandler}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <DragDropContext onDragEnd={dragEndHandler}>
              <div className="w-[45rem] m-0 flex flex-row gap-8 justify-center">
                {columns.map((column) => {
                  return <SignupColumn key={column.id} column={column} />;
                })}
              </div>
            </DragDropContext>
          </div>
        </div>
      )}
    </>
  );

  async function signupHandler() {
    setLoading(true);
    // This value is hardcoded so, we can guarantee that this can't be undefined
    const done = columns.find((column) => column.id === "done")!;
    if (done.taskIds.length < 4) {
      renderInfoToast('Please drag all tasks to the "Done" column');
      return;
    }

    const credentials = done.taskIds.reduce(
      (acc, id) => {
        const task = tasks[id];

        switch (task.name) {
          case "first-name":
            acc.firstName = task.value;
            break;
          case "last-name":
            acc.lastName = task.value;
            break;
          case "email":
            acc.email = task.value;
            break;
          case "password":
            acc.password = task.value;
            break;
        }
        return acc;
      },
      {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: UserRole.Employee,
        profileImageUrl: null,
      },
    );

    await signup(credentials);
    setLoading(false);
    if (checkAuth()) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    }
  }

  function dragEndHandler(result: DropResult): void {
    const { destination, source } = result;
    if (!destination) return;
    moveTask(source, destination);
  }
};

export default Signup;
