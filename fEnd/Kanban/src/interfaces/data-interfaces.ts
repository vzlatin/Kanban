export interface Section {
	id: number;
	title: string;
	boards: Board[];
}

export interface Board {
	id: number;
	title: string;
	section: number;
	columns: Column[];
}

export interface Column {
	id: number;
	title: string;
	boardId: number;
	columnOrder: number;
	tasks: Task[];
}

export interface Task {
	id: number;
	columnId: number;
	boardId: number;
	title: string;
	description?: string;
	taskOrder: number;
	tag: string;
	userId?: User;
	status: TaskStatus;
	createdOn: Date;
	completedOn?: Date;
}

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
}

enum TaskStatus {
	Review = "review",
	InProgress = "in progress",
	Testing = "Testing",
	Done = "done",
}

export enum UserRole {
	Employee = "employee",
	Manaager = "manager",
	Admin = "admin",
	None = "none",
}
