import React from "react";

const TaskAdding = () => {
    return(
        <div className="card todo-summary" style={{padding: 15 + "px", margin: 50 + "px"}}>
            <form method="post" action="/events">
                <label htmlFor="taskname">Task Name</label>
                <input type="text" name="taskname" data-length="10" />
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" className="materialize-textarea" data-length="120" ></textarea>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" />
                <button className="btn pink lighten-1 z-depth-0">Create</button>
            </form>
        </div>
    )
}

export default TaskAdding;