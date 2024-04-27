import React, { useState, useEffect } from "react";
import { Card } from "../Components/Card/card";
import axios from "axios";

export const TodoPage = () => {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api")
            .then((response) => {
                // TODO: add better error handling
                if (response.status === 200) {
                    console.log(response.data);
                    setTodo(response.data);
                }
            })
            .catch((fail) => console.log("request failed"));
    }, []);

    return (
        <>
            {todo.map((todo) => (
                <Card task={todo.task} />
            ))}
        </>
    );
};
