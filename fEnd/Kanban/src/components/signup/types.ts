export interface IColumn {
    id: string;
    title: string;
    tasks: ITask[];
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
    task: ITask;
    index: number;
};
