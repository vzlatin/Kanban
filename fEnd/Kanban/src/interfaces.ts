export interface Border {
    id: number;
    title: string;
    description?: string;
    columns: Column[];
}

export interface Column {
    id: number;
    title: string;
    boardId: number;
    order: number;
    tasks: Task[];
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    order: number;
    assignedUser?: User;
    status: TaskStatus;
    columnId: number;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
}

enum TaskStatus {
    Review = "review",
    InProgress = "in progress",
    OnHold = "on hold",
    Cancelled = "cancelled",
    Done = "done",
}

enum UserRole {
    Employee = "employee",
    Manaager = "manager",
    Admin = "admin",
}
