import { IColumn } from "./types";

export const initialColumns: IColumn[] = [
    {
        id: "work-in-progress",
        title: "Work in Progress",
        tasks: [
            {
                id: "1",
                title: "Task no. 0001",
                type: "text",
                name: "first-name",
                htmlId: "first-name",
                content: "First Name",
                isValid: false,
                value: "",
            },
            {
                id: "2",
                title: "Task no. 0002",
                type: "text",
                name: "last-name",
                htmlId: "last-name",
                content: "Last Name",
                isValid: false,
                value: "",
            },
            {
                id: "3",
                title: "Task no. 0003",
                type: "text",
                name: "email",
                htmlId: "email",
                content: "Email",
                isValid: false,
                value: "",
            },
            {
                id: "4",
                title: "Task no. 0004",
                type: "password",
                name: "password",
                htmlId: "password",
                content: "Password",
                isValid: false,
                value: "",
            },
        ],
    },
    {
        id: "done",
        title: "Done",
        tasks: [],
    },
];
