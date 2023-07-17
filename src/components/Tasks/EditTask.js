import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { db } from "../../Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";

const EditTask = () => {

    const { characterCounter } = useContext(GlobalContext);  
    const { id } = useParams();
    const [todo, setTodo] = useState({});
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

    // Read ToDo from firebase
    useEffect(() => {
        const getTodo = async () => {
            const docRef = doc(db, "ToDos", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setTodo({
                    id: docSnap.id,
                    ...docSnap.data(),
                });
                setDate(docSnap.data().date.toDate().toISOString().split('T')[0]); // Set the date state here
            } else {
                console.log("No such document!");
            }
        }
        getTodo();
    }, [id]);

    const handleChange = (e, field) => {
        characterCounter(e);
        setTodo(prevTodo => ({
            ...prevTodo,
            [field]: e.target.value,
        }));
    }

    const updateTodo = async () => { 
        const docRef = doc(db, "ToDos", id);
        try {
            await updateDoc(docRef, {
                name: todo.name,
                text: todo.text,
                date: new Date(`${date}T12:00:00`) // Use the date state here and set the time to noon
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }
    
    return (
        <div className="container section todo-edit">
            <div className="card z-depth-0">
                <div className="card-content">
                    <form>
                        <h5 className="grey-text text-darken-3">Edit Task</h5>
                        <div className="input">
                            <label htmlFor="title">Task Name</label>
                            <input type="text" id="title" value={todo.name || ""} data-length="35" onChange={(e) => handleChange(e, 'name')}/>
                        </div>
                        <div className="input">
                            <label htmlFor="description">Task Description</label>
                            <textarea id="description" value={todo.text || ""} className="materialize-textarea" data-length="120" onChange={(e) => handleChange(e, 'text')}></textarea>
                        </div>
                        <div className="input-field">
                            <label htmlFor="date" className="active">Task Date</label>
                            <input value={formatDate(date)} type="date" id="date" onChange={dateFormatChange}/>
                        </div>
                        <div className="input-field">
                            <Link to="/"><button onClick={updateTodo} className="btn pink lighten-1 z-depth-0">Update</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask;