import styles from "./Header.module.css";

const Header = () => {
	const placeholder = Array.from({ length: 6 }, (_, i) => i);
	return (
		<>
			<div className={styles["header"]}>
				<div className={styles["search"]}>
					<div className={styles["search-logo"]}>
						<img
							className={styles["search-logo-image"]}
							src="public/search.svg"
							alt="search icon"
						/>
					</div>
					<input
						type="text"
						className={styles["search-input"]}
						placeholder="Search"
					/>
				</div>
				<div className={styles["team"]}>
					<div className={styles["team-members"]}>
						{placeholder.map((_) => {
							return (
								<div className={styles["member"]}>
									<img src="public/user-profile.svg" alt="user photo" />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
