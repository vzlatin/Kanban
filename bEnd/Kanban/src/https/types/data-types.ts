import {
  Board,
  Column,
  Comment,
  Section,
  Task,
  TaskToDo,
} from "../../websockets/types/entities.ts";

export type EntityCollection = {
  sections: Section[];
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  taskToDos: TaskToDo[];
  comments: Comment[];
};
