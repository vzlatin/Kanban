import { create } from "zustand";
import { SignupStore } from "./types";

export const useSignupStore = create<SignupStore>((set) => ({
	tasks: {
		"1": {
			id: "1",
			title: "Task no. 0001",
			type: "text",
			name: "first-name",
			htmlId: "first-name",
			content: "First Name",
			isValid: false,
			value: "",
		},
		"2": {
			id: "2",
			title: "Task no. 0002",
			type: "text",
			name: "last-name",
			htmlId: "last-name",
			content: "Last Name",
			isValid: false,
			value: "",
		},
		"3": {
			id: "3",
			title: "Task no. 0003",
			type: "text",
			name: "email",
			htmlId: "email",
			content: "Email",
			isValid: false,
			value: "",
		},
		"4": {
			id: "4",
			title: "Task no. 0004",
			type: "password",
			name: "password",
			htmlId: "password",
			content: "Password",
			isValid: false,
			value: "",
		},
	},
	columns: [
		{
			id: "work-in-progress",
			title: "Work in Progress",
			taskIds: ["1", "2", "3", "4"],
		},
		{
			id: "done",
			title: "Done",
			taskIds: [],
		},
	],
	moveTask: (source, destination) =>
		set((state) => {
			const copy = { ...state };
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			)
				return copy;

			const sColumn = copy.columns.find(
				(column) => column.id === source.droppableId
			);
			const dColumn = copy.columns.find(
				(column) => column.id === destination.droppableId
			);
			if (!sColumn || !dColumn) return state;

			if (source.droppableId === destination.droppableId) {
				// We're dragging within the same container
				const [removed] = sColumn.taskIds.splice(source.index, 1);
				sColumn.taskIds.splice(destination.index, 0, removed);
			} else {
				const [removed] = sColumn.taskIds.splice(source.index, 1);
				dColumn.taskIds.splice(destination.index, 0, removed);
			}
			return copy;
		}),

	updateTask: (task, isValid, value) => {
		set((state) => {
			const newTasks = {
				...state.tasks,
				[task.id]: {
					...state.tasks[task.id],
					value,
					isValid,
				},
			};
			return { tasks: newTasks };
		});
	},
}));
