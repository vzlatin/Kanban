import { DraggableLocation } from "@hello-pangea/dnd";

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

export interface SignupStore {
	tasks: { [key: string]: ITask };
	columns: IColumn[];
	moveTask: (
		source: DraggableLocation<string>,
		destination: DraggableLocation<string>
	) => void;
	updateTask: (task: ITask, isValid: boolean, newValue: string) => void;
}
