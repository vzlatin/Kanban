import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Signin.module.css";
import { useState } from "react";
import { useAuthStore } from "./store";
import { checkAuth } from "../../services/user.service";

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const signin = useAuthStore((state) => state.signin);

	const navigate = useNavigate();
	const location = useLocation();

	const signinHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		//Validate the input or whatever
		e.preventDefault();
		await signin(email, password);

		if (checkAuth()) {
			const redirectTo = location.state?.from?.pathname || "/";
			navigate(redirectTo, { replace: true });
		}
	};

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
							<h1>Welcome to the Sign In page</h1>
							<h3>Please provide your account email and pasword.</h3>

							<p>
								Don't have an account ? <br />
								<NavLink to={"/signup"}>Sign up here.</NavLink>
							</p>
						</div>
					</div>
					<div className={styles["form-container"]}>
						{/* <form> */}
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
						<button className={styles["signup-button"]} onClick={signinHandler}>
							Sign In
						</button>
						{/* </form> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default Signin;
