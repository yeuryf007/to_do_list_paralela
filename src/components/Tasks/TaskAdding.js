import { addDoc, collection } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { db } from "../../Firebase";
import { GlobalContext } from "../../context/GlobalContext";

const TaskAdding = () => {

    const { characterCounter } = useContext(GlobalContext);  
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const dateFormatChange = (e) => {
        setDate(e.target.value);
    }

    const formatDate = (dateString) => {
        if (!dateString) {
        return '';
        }

        const [year, month, day] = dateString.split('-');
        
        return `${year}-${month}-${day}`;
    }

    const createTodo = async (e) => {
        e.preventDefault();
        if (taskName === "" || description === "" || date === "") {
        alert("Please fill all the fields");
        return;
        } else {
        const dateToSave = new Date(`${date}T00:00:00`);
        await addDoc(collection(db, "ToDos"), {
            name: taskName,
            text: description,
            date: dateToSave,
            completed: false
        });
        setTaskName("");
        setDescription("");
        setDate("");
        }
    }

    return (
        <div className="card" style={{ padding: "15px", margin: "50px" }}>
        <form onSubmit={createTodo} method="post" action="/events">
            <label htmlFor="taskname">Task Name</label>
            <input type="text" id="taskname" name="taskname" data-length="35" value={taskName} onChange={(e) => {characterCounter(e); setTaskName(e.target.value)}} />
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" className="materialize-textarea" data-length="120" value={description} onChange={(e) =>{characterCounter(e); setDescription(e.target.value)} }></textarea>
            <label htmlFor="date">Date</label>
            <input onChange={dateFormatChange} value={formatDate(date)} type="date" id="date" name="date" />
            <button className="btn pink lighten-1 z-depth-0">Create</button>
        </form>
        </div>
    );
}

export default TaskAdding;