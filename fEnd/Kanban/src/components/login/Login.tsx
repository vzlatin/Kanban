import { useState } from "react";
import styles from "./Login.module.css";
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    UniqueIdentifier,
} from "@dnd-kit/core";
import { IColumn } from "./types";
import LoginColumn from "./login-helper-components/LoginColumn";
import { arrayMove } from "@dnd-kit/sortable";

const initialColumns: IColumn[] = [
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
            },
            {
                id: "2",
                title: "Task no. 0002",
                type: "text",
                name: "last-name",
                htmlId: "last-name",
                content: "Last Name",
            },
            {
                id: "3",
                title: "Task no. 0003",
                type: "text",
                name: "email",
                htmlId: "email",
                content: "Email",
            },
            {
                id: "4",
                title: "Task no. 0004",
                type: "password",
                name: "password",
                htmlId: "password",
                content: "Password",
            },
        ],
    },
    {
        id: "done",
        title: "Done",
        tasks: [],
    },
];

const Login = () => {
    const [columns, setColumns] = useState<IColumn[]>(initialColumns);

    return (
        <>
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                <div className={styles["login-container"]}>
                    <div className={styles["login-form"]}>
                        {Object.values(columns).map((column) => {
                            return (
                                <LoginColumn
                                    key={column.id}
                                    column={column}
                                    styles={styles}
                                />
                            );
                        })}
                    </div>
                </div>
            </DndContext>
        </>
    );

    /** This function will find a column based on an id parameter
     * which can be either a column id or a task id */
    function findColumn(unique: UniqueIdentifier | null): IColumn | null {
        for (const column of columns) {
            if (
                column.id === unique ||
                column.tasks.some((task) => task.id === unique)
            ) {
                return column;
            }
        }
        return null;
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over, delta } = event;
        const activeColumn = findColumn(active.id);
        const overColumn = findColumn(over?.id ?? null);

        if (!activeColumn || !overColumn || activeColumn === overColumn) return;

        setColumns((prevState) => {
            return prevState.map((column) => {
                if (column.id === activeColumn.id) {
                    return {
                        ...column,
                        tasks: column.tasks.filter(
                            (task) => task.id !== active.id
                        ),
                    };
                }
                if (column.id === overColumn.id) {
                    const newIndex =
                        overColumn.tasks.findIndex(
                            (task) => task.id === over?.id
                        ) + (delta.y > 0 ? 1 : 0);
                    const updatedCards = [...overColumn.tasks];
                    updatedCards.splice(
                        newIndex,
                        0,
                        activeColumn.tasks.find(
                            (task) => task.id === active.id
                        )!
                    );
                    return { ...column, tasks: updatedCards };
                }
                return column;
            });
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const activeColumn = findColumn(active.id);
        const overColumn = findColumn(over?.id ?? null);

        if (!activeColumn || !overColumn || activeColumn !== overColumn) return;

        const activeIndex = activeColumn.tasks.findIndex(
            (task) => task.id === active.id
        );
        const overIndex = overColumn.tasks.findIndex(
            (task) => task.id === over?.id
        );
        if (activeIndex !== overIndex) {
            setColumns((prevColumns) => {
                return prevColumns.map((column) => {
                    if (column.id === activeColumn.id) {
                        const updatedCards = arrayMove(
                            column.tasks,
                            activeIndex,
                            overIndex
                        );
                        return { ...column, tasks: updatedCards };
                    }
                    return column;
                });
            });
        }
    }
};

export default Login;
