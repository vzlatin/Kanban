import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

import { IColumn } from "./types";
import styles from "./Signup.module.css";
import { initialColumns } from "./data";
import SignupColumn from "./signup-helper-components/SignupColumn";

const Signup = () => {
    const [columns, setColumns] = useState<IColumn[]>(initialColumns);

    return (
        <>
            <div className={styles["signup-container"]}>
                <div className={styles["content-container"]}>
                    <div className={styles["signup-static"]}>
                        <div className={styles.logo}>
                            <h1>Kooking Board</h1>
                            <img
                                className={styles["logo-image"]}
                                src="logo.svg"
                                alt="Logo Image"
                            />
                        </div>
                        <div className={styles["welcome-text"]}>
                            <h1>Welcome to the Sign Up page</h1>
                            <h3>
                                Complete the tasks and drag them to the Done
                                <br />
                                column to proceed with the sign up.
                            </h3>

                            <p>
                                Already have an account ? <br />
                                <a href="#">Sign in here.</a>
                            </p>
                            <button className={styles["signup-button"]}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={dragEndHandler}>
                        <div className={styles["signup-form"]}>
                            {columns.map((column) => {
                                return (
                                    <SignupColumn
                                        key={column.id}
                                        column={column}
                                    />
                                );
                            })}
                        </div>
                    </DragDropContext>
                </div>
            </div>
        </>
    );

    function dragEndHandler(result: DropResult): void {
        const { destination, source } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        setColumns((columns) => {
            const copy = [...columns];

            const sourceColumn = copy.find(
                (column) => column.id === source.droppableId
            );
            const destinationColumn = copy.find(
                (column) => column.id === destination.droppableId
            );
            if (!sourceColumn || !destinationColumn) return copy;

            // We're dragging within the same column
            if (source.droppableId === destination.droppableId) {
                const [removed] = sourceColumn.tasks.splice(source.index, 1);
                sourceColumn.tasks.splice(destination.index, 0, removed);
            } else {
                const [removed] = sourceColumn.tasks.splice(source.index, 1);
                destinationColumn.tasks.splice(destination.index, 0, removed);
            }
            return copy;
        });
    }
};

export default Signup;
