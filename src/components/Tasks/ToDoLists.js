import React, { useState, useEffect } from "react";
import ToDoSummary from "./ToDoSummary";
import { db } from "../../Firebase";
import { onSnapshot, collection, query } from "firebase/firestore";


const ToDoLists = () => {
    const [Todos, setTodos] = useState([]); // Todos is the state, setTodos is the function that updates the state
    //Read ToDo from firebase
    useEffect(() => {
        const q = query(collection(db, 'ToDos'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let ToDosArr = [];
            querySnapshot.forEach((doc) => {
                ToDosArr.push({...doc.data(), id: doc.id});
            });
            setTodos(ToDosArr);
        });
        return () => unsubscribe();
    }, []);

    return (
        // Print the list of tasks
        <ul className="todo-list section">
            {Todos.map((todo, index) => (
                <ToDoSummary key={index} todo={todo} />
            ))} 
        </ul> 
    )
}

export default ToDoLists;