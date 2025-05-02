import SignupTask from "../signup-task/SignupTask";
import { ColumnProps } from "../../../../state/stores/signup/types";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";

const SignupColumn: React.FC<ColumnProps> = ({ column }) => {
  return (
    <div>
      <p className="ml-4 my-[0.5rem] font-medium text-primary">
        {column.title}
      </p>
      <Droppable droppableId={column.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[30rem] w-[20rem] py-[0.5rem] flex flex-col items-center"
              style={
                snapshot.isDraggingOver
                  ? { border: "0.063rem var(--color-font) dashed" }
                  : {}
              }
            >
              {column.taskIds.map((taskId, index) => {
                return (
                  <SignupTask key={taskId} taskId={taskId} index={index} />
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default SignupColumn;
