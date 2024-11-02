export interface User {
    [key: string]: unknown;
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "admin" | "manager" | "employee";
    activationLink: string;
    isActivated: boolean;
}
