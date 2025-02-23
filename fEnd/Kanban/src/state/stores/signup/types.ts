import { UserRole } from "../../../types/entities";
import { DraggableLocation } from "@hello-pangea/dnd";

export interface SignupStore {
  tasks: { [key: string]: ITask };
  columns: IColumn[];
  moveTask: (
    source: DraggableLocation<string>,
    destination: DraggableLocation<string>,
  ) => void;
  updateTask: (task: ITask, isValid: boolean, newValue: string) => void;
}


export type IColumn = {
  id: string;
  title: string;
  taskIds: string[];
}

export type ITask = {
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
