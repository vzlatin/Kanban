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
      title={`${user.firstName} ${user.lastName}`}
      className={`${connectedUsers.includes(user.id) && "outline outline-accent-green-100"} max-w-[7rem] w-auto h-[2.5rem] shadow-sm rounded-[0.5rem] flex flex-row gap-[0.4rem] items-center p-[0.5rem] transition-all duration-300 ease-in-out hover:shadow-md hover:cursor-pointer active:shadow-none active:inset-shadow-md`}
    >
      <div className="whitespace-nowrap overflow-hidden">
        <p className="text-ellipsis overflow-hidden m-0 text-[0.8rem] font-medium text-primary">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <img src="/user-profile.svg" alt="user photo" />
    </div>
  );
};

export default UserPill;
