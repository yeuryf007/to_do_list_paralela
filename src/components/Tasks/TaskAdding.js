import { addDoc, collection } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { db } from "../../Firebase";
import { GlobalContext } from "../../context/GlobalContext";

const TaskAdding = () => {
    const { characterCounter } = useContext(GlobalContext);
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const dateFormatChange = (e) => {
        setDate(e.target.value);
    };

    const formatDate = (dateString) => {
        if (!dateString) {
            return "";
        }

        const [year, month, day] = dateString.split("-");
        return `${year}-${month}-${day}`;
    };

    const createTodo = async (e) => {
        e.preventDefault();
        if (taskName === "" || description === "" || date === "") {
            alert("Please fill all the fields");
            return;
        }

        if (password.length > 0 && password.length < 5) {
            alert("La contraseña debe de ser de 5 caracteres o más");
            return;
        }

        // Resto del código para crear la tarea en la base de datos
        const dateToSave = new Date(`${date}T00:00:00`);
        await addDoc(collection(db, "ToDos"), {
            name: taskName,
            text: description,
            date: dateToSave,
            completed: false,
            pass: password,
        });
        setTaskName("");
        setDescription("");
        setDate("");
        setPassword("");
    };

    const handleMouseDown = () => {
        setShowPassword(true);
        setIsPasswordVisible(true); // Actualizar el estado para cambiar el estilo del botón
    };

    const handleMouseUp = () => {
        setShowPassword(false);
        setIsPasswordVisible(false); // Actualizar el estado para cambiar el estilo del botón
    };

    return (
        <div className="card" style={{ padding: "15px", margin: "50px" }}>
            <form onSubmit={createTodo} method="post" action="/events">
                <label htmlFor="taskname">Task Name</label>
                <input
                type="text"
                id="taskname"
                name="taskname"
                data-length="35"
                value={taskName}
                onChange={(e) => {
                    characterCounter(e);
                    setTaskName(e.target.value);
                }}
                />
                <label htmlFor="description">Description</label>
                <textarea
                name="description"
                id="description"
                className="materialize-textarea"
                data-length="120"
                value={description}
                onChange={(e) => {
                    characterCounter(e);
                    setDescription(e.target.value);
                }}
                ></textarea>
                <label htmlFor="date">Date</label>
                <input
                onChange={dateFormatChange}
                value={formatDate(date)}
                type="date"
                id="date"
                name="date"
                />
                <label htmlFor="date">Password (optional)</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        data-length="35"
                        placeholder="Esta contraseña permite hacer las tareas privadas"
                        value={password}
                        onChange={(e) => {
                        characterCounter(e);
                        setPassword(e.target.value);
                        }}
                    />
                    <button
                        style={{
                        marginLeft: "10px",
                        background: isPasswordVisible ? "lightgreen" : "white",
                        border: "none", // Eliminamos los bordes del botón
                        padding: "5px 0px 10px", // Ajustamos el padding para que el botón se vea más compacto
                        borderRadius: "5px", // Agregamos bordes redondeados al botón
                        cursor: "pointer", // Cambiamos el cursor al pasar sobre el botón
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onBlur={handleMouseUp}
                        type="button"
                    >
                        {showPassword ? "👀" : "👀"}
                    </button>
                </div>
                <button className="btn pink lighten-1 z-depth-0">Create</button>
            </form>
        </div>
    );
};

export default TaskAdding;
