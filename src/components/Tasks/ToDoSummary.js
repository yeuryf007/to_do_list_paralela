import React from "react";

const ToDoSummary = () => {
    return (
        <div className="card z-depth-0 todo-summary">
            <div className="card-content grey-text text-darken-3">
                <span className="card-title">Task Name</span>
                <p>Task description</p>
                <p className="grey-text">Task date</p>
            </div>
        </div>
    )
}

export default ToDoSummary;