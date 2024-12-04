import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import styles from "./Signup.module.css";
import SignupColumn from "./signup-helper-components/signup-column/SignupColumn";
import { useSignupStore } from "./store";
import { NavLink } from "react-router-dom";

const Signup = () => {
	const columns = useSignupStore((state) => state.columns);
	const moveTask = useSignupStore((state) => state.moveTask);

	return (
		<>
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
							<button className={styles["signup-button"]}>Sign In</button>
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
		</>
	);

	function dragEndHandler(result: DropResult): void {
		const { destination, source } = result;
		if (!destination) return;
		moveTask(source, destination);
	}
};

export default Signup;
