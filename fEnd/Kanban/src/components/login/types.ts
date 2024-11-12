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
}

export type ColumnProps = { column: IColumn; styles: CSSModuleClasses };

export type TaskProps = { task: ITask; styles: CSSModuleClasses };
