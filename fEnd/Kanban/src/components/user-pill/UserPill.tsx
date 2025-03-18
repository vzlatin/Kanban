import styles from "./UserPill.module.css";

import { User } from "../../types/entities";
import { useKanbanStore } from "../../state/stores/global/global.store";

type UserPillProps = {
  user: User;
};

const UserPill: React.FC<UserPillProps> = ({ user }) => {
  const connectedUsers = useKanbanStore((state) => state.connectedUsers).map(
    (user) => user.id,
  );
  return (
    <div
      className={`${styles["member"]}
       ${connectedUsers.includes(user.id) ? styles["connected"] : ""}`}
    >
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
