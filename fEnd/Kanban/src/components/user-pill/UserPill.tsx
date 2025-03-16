import styles from "./UserPill.module.css";

import { User } from "../../types/entities";

type UserPillProps = {
  user: User;
};

const UserPill: React.FC<UserPillProps> = ({ user }) => {
  return (
    <div className={styles["member"]}>
      <div className={styles["username"]}>
        <p>{user.firstName} {user.lastName}</p>
      </div>

      <img
        src="/user-profile.svg"
        alt="user photo"
      />
    </div>
  );
};

export default UserPill;
