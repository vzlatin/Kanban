import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { TaskProps } from "../../types";
import styles from "./SignupTask.module.css";
import { useSignupStore } from "../../store";
import { useState } from "react";
import { useDebounce, useEfectAfterMount } from "../../../../utils/hooks";
import { validate } from "../../validators";

const SignupTask: React.FC<TaskProps> = ({ taskId, index }) => {
	const task = useSignupStore((state) => state.tasks[taskId]);
	const updateTask = useSignupStore((state) => state.updateTask);

	const [inputValue, setInputValue] = useState("");
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
						className={styles.task}
						ref={provided.innerRef}
						{...provided.draggableProps}
					>
						<div className={styles["title-container"]}>
							<div className={styles["task-number"]}>
								<p>{task.title}</p>
							</div>
							<div
								className={`${styles["drag-handle"]} ${
									errors.length === 0
										? styles["drag-handle-enabled"]
										: styles["drag-handle-disabled"]
								}`}
								{...provided.dragHandleProps}
							>
								<p>Drag Me</p>
							</div>
						</div>
						<div className={styles["task-input"]}>
							<label className={styles.label} htmlFor={task.htmlId}>
								{task.content}
							</label>
							<input
								className={styles.password}
								value={inputValue}
								onChange={(e) => {
									setInputValue(e.target.value);
								}}
								type={task.type}
								name={task.name}
								id={task.htmlId}
								autoComplete="true"
							/>
						</div>

						<div className={styles["error-container"]}>
							<div className={styles["error-message"]}>{errors[0]?.error}</div>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};

export default SignupTask;
