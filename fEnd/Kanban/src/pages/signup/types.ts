import { DraggableLocation } from "@hello-pangea/dnd";
import { UserRole } from "../../interfaces/data-interfaces";

export interface IColumn {
	id: string;
	title: string;
	taskIds: string[];
}

export interface ITask {
	title: string;
	type: "text" | "password";
	name: string;
	htmlId: string;
	id: string;
	content: string;
	isValid: boolean;
	value: string;
}

export type ColumnProps = {
	column: IColumn;
};

export type TaskProps = {
	taskId: string;
	index: number;
};

export type Credentials = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: UserRole;
};

export interface SignupStore {
	tasks: { [key: string]: ITask };
	columns: IColumn[];
	moveTask: (
		source: DraggableLocation<string>,
		destination: DraggableLocation<string>
	) => void;
	updateTask: (task: ITask, isValid: boolean, newValue: string) => void;
}
