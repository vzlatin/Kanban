export interface User {
	[key: string]: unknown;
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "admin" | "manager" | "employee" | "none";
}

export const userColumns: Array<keyof User> = [
	"id",
	"firstName",
	"lastName",
	"email",
	"password",
	"role",
];
