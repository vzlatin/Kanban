export enum TaskStatus {
	New,
	InProgress,
	Testing,
	Done,
}

export interface Board {
	[key: string]: unknown;
	id: number;
	title: string;
}

export interface Column {
	[key: string]: unknown;
	id: number;
	title: string;
}

export interface Task {
	[key: string]: unknown;
	id: number;
	userId: number;
	title: string;
	description: string;
	status: TaskStatus;
	tag: string;
	createdOn: Date;
	completedOn: Date;
}

export interface TaskTodos {
	id: number;
	taskId: number;
	title: string;
	completed: boolean;
}

export interface Comments {
	id: number;
	taskId: number;
	userId: number;
	content: string;
	createdOn: Date;
}
