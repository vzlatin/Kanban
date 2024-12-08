import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import styles from "./Signup.module.css";
import SignupColumn from "./signup-helper-components/signup-column/SignupColumn";
import { useSignupStore } from "./store";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../signin/store";
import { renderErrorToast, renderInfoToast } from "../../utils/toasts";
import { UserRole } from "../../interfaces/data-interfaces";
import { checkAuth } from "../../services/user.service";
import { useEffect } from "react";
import ErrorNotification from "../../components/error/ErrorNotification";

const Signup = () => {
	const columns = useSignupStore((state) => state.columns);
	const moveTask = useSignupStore((state) => state.moveTask);
	const tasks = useSignupStore((state) => state.tasks);

	const signup = useAuthStore((state) => state.signup);
	const error = useAuthStore((state) => state.error);
	const loading = useAuthStore((state) => state.loading);
	const setLoading = useAuthStore((state) => state.setLoading);

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			renderErrorToast(<ErrorNotification error={error} />);
		}
	}, [error]);

	return (
		<>
			{loading ? (
				<p>Loading Spinner ... </p>
			) : (
				<div className={styles["signup-container"]}>
					<div className={styles["content-container"]}>
						<div className={styles["signup-static"]}>
							<div className={styles.logo}>
								<h1>Kooking Board</h1>
								<img
									className={styles["logo-image"]}
									src="logo.svg"
									alt="Logo Image"
								/>
							</div>
							<div className={styles["welcome-text"]}>
								<h1>Welcome to the Sign Up page</h1>
								<h3>
									Complete the tasks and drag them to the Done
									<br />
									column to proceed with the sign up.
								</h3>

								<p>
									Already have an account ? <br />
									<NavLink to={"/signin"}>Sign in here.</NavLink>
								</p>
								<button
									className={styles["signup-button"]}
									onClick={signupHandler}
								>
									Sign Up
								</button>
							</div>
						</div>
						<DragDropContext onDragEnd={dragEndHandler}>
							<div className={styles["signup-form"]}>
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
		// setLoading(true);
		// This value is hardcoded so, we can guarantee that this can't be undefined
		const done = columns.find((column) => column.id === "done")!;
		if (done.taskIds.length < 4) {
			renderInfoToast('Please drag all tasks to the "Done" column');
			renderErrorToast("Some Error Message");
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
			}
		);

		await signup(credentials);
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
