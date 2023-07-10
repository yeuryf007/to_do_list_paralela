import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { db } from "../../Firebase";
import { Link } from 'react-router-dom';
import "./styleSummary.css";

const ToDoSummary = ({todo}) => {

    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, "ToDos", todo.id), {
            completed: !todo.completed
        });
    }

    const deleteTask = async (todo) => {
        console.log("Document successfully deleted!");
        await deleteDoc(doc(db, "ToDos", todo.id));
        
    }

    const style = {
        card: "card z-depth-0",
        cardCompleted: "card z-depth-0 grey lighten-3"
    }

    return (
        <div className={ todo.completed ? style.cardCompleted : style.card}>
            <div onClick={() => toggleComplete(todo)} className="card-content grey-text text-darken-3">
                <span id={todo.id} className="card-title">{ todo.name }</span>
                <p className={todo.completed ? "black-text" : "grey-text"}>{ todo.completed ? "Completed" : "Pending" }</p>
                <p>{ todo.text }</p>
                <p className="grey-text">{ new Date(todo.date.seconds * 1000).toLocaleDateString("en-US") }</p>
            </div>
            <div className="card-action">
                <Link to={"/edit/" + todo.id} className="s1 btn pink lighten-1 z-depth-0 offset-m1">{ <FaPencilAlt /> }</Link>
                <button className="button margin s1 btn pink lighten-1 z-depth-0 offset-m1" onClick={ () => deleteTask(todo) }>{ <FaRegTrashAlt /> }</button>
            </div>
        </div>
    )
}

export default ToDoSummary;