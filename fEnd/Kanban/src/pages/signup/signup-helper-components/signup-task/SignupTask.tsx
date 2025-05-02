import { useState } from "react";
import { validate } from "../../validators";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { TaskProps } from "../../../../state/stores/signup/types";
import { useSignupStore } from "../../../../state/stores/signup/store";
import {
  useDebounce,
  useEfectAfterMount,
} from "../../../../miscellaneous/hooks/hooks";

const SignupTask: React.FC<TaskProps> = ({ taskId, index }) => {
  const task = useSignupStore((state) => state.tasks[taskId]);
  const updateTask = useSignupStore((state) => state.updateTask);

  const [inputValue, setInputValue] = useState(task.value);
  const debouncedInputValue = useDebounce(inputValue);

  const [errors, setErrors] = useState<Record<string, string>[]>([]);

  useEfectAfterMount(() => {
    const { isValid, errors } = validate(debouncedInputValue, task.name);
    setErrors(errors);
    if (isValid) updateTask(task, isValid, debouncedInputValue);
  }, [debouncedInputValue]);

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={errors.length !== 0}
    >
      {(provided: DraggableProvided) => {
        return (
          <div
            className="w-[18rem] h-32 flex flex-col mb-4 rounded-[0.5rem] shadow-sm p-2 font-medium text-primary border-[1px] border-accent-grey-100"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="flex flex-row justify-between mt-2">
              <div className="text-[0.85rem] ml-2">
                <p>{task.title}</p>
              </div>
              <div
                className={`text-[0.85rem] w-24 mr-2 pl-[0.2rem] pr-[0.2rem] rounded-[0.5rem] border-[0.063rem] border-primary border-dashed flex flex-row items-center justify-center
                  ${
                    errors.length === 0
                      ? "text-accent-blue-200 hover:cursor-pointer"
                      : "text-danger hover:cursor-not-allowed"
                  }`}
                {...provided.dragHandleProps}
              >
                <p className={`m-0`}>Drag Me</p>
              </div>
            </div>
            <div className="flex flex-row items-center mt-6 gap-2 relative">
              <label
                className="absolute left-2 font-light text-primary"
                htmlFor={task.htmlId}
              >
                {task.content}
              </label>
              <input
                className="absolute right-4 h-8 p-[0.4rem] w-[60%] rounded-[0.5rem] appearance-none font-medium text-xs text-primary bg-background inset-shadow-md border-[0.063rem] border-accent-grey-100 border-solid focus:outline-none"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                type={task.type}
                name={task.name}
                id={task.htmlId}
                autoComplete="off"
              />
            </div>

            <div className="mt-6 pl-2 pr-2">
              <div className="text-[0.75rem] text-danger font-light">
                {errors[0]?.error}
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default SignupTask;
