import React, { useState, useEffect } from "react";
import ToDoSummary from "./ToDoSummary";
import { db } from "../../Firebase";
import { onSnapshot, collection, query, orderBy, where } from "firebase/firestore";

const ToDoLists = () => {
    const [originalTodos, setOriginalTodos] = useState([]);
    const [Todos, setTodos] = useState([]);
    const [searchPassword, setSearchPassword] = useState("");
    const [isFiltered, setIsFiltered] = useState(false);
    const [showPasswordTodos, setShowPasswordTodos] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

        const q = query(
            collection(db, "ToDos"),
            orderBy("date", "asc"),
            // Add a where clause to filter tasks with due dates starting from today
            where("date", ">=", today)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let ToDosArr = [];
            querySnapshot.forEach((doc) => {
                ToDosArr.push({ ...doc.data(), id: doc.id });
            });

            if (isFiltered) {
                const filteredTodos = ToDosArr.filter((todo) => todo.pass === searchPassword);
                setTodos(filteredTodos);
            } else if (showPasswordTodos) {
                setTodos(ToDosArr.filter((todo) => todo.pass === "" || !todo.pass));
            } else {
                setTodos(ToDosArr);
            }
            setOriginalTodos(ToDosArr);
        });

        // Al cargar la página, mostramos las tareas con contraseña en blanco o nulas
        setTodos(originalTodos.filter((todo) => todo.pass === "" || !todo.pass));
        setShowPasswordTodos(true);

        return () => unsubscribe();
    }, [isFiltered, showPasswordTodos]);

    const handleCombinedSearch = () => {
        const filteredTodos = originalTodos.filter(
            (todo) =>
            (searchPassword.trim() === "" || todo.pass === searchPassword) &&
            (searchText.trim() === "" ||
              todo.text.toLowerCase().includes(searchText.toLowerCase()) ||
              todo.name.toLowerCase().includes(searchText.toLowerCase()))
        );
    
        setTodos(filteredTodos);
        setIsFiltered(true);
      };

    const showAllTodos = () => {
        setTodos(originalTodos.filter((todo) => todo.pass === "" || !todo.pass)); // Filtrar tareas con contraseña en blanco o nulas
        setShowPasswordTodos(true); // Indicamos que se mostrarán las tareas con contraseña
        setIsFiltered(false); // Indicamos que las tareas ya no están filtradas
    };

    return (
        <div>
            <div>
                {/* Input for text search */}
                <input
                type="text"
                placeholder="Buscar por texto o nombre"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: "250px", marginRight: "10px" }}
                />
        
                {/* Input for password search */}
                <input
                type="password"
                placeholder="Contraseña"
                value={searchPassword}
                onChange={(e) => setSearchPassword(e.target.value)}
                style={{ width: "150px", marginRight: "10px" }}
                />
        
                {/* Combined search button */}
                <button
                style={{
                    margin: "0 5px",
                    padding: "5px",
                    border: "none",
                    borderRadius: "5px",
                    background: isHovered ? "rgb(250, 54, 123,0.5)" : "none",
                    cursor: "pointer",
                }}
                onClick={handleCombinedSearch}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                >
                {isFiltered ? "🔍" : "🔍"}
                </button>
        
                <button className="btn pink lighten-1 z-depth-0" onClick={showAllTodos}>
                Mostrar Todo
                </button>
            </div>
    
            <ul className="todo-list section">
                {Todos.map((todo, index) => (
                <ToDoSummary key={index} todo={todo} />
                ))}
            </ul>
        </div>
      );
    };
    
    export default ToDoLists;