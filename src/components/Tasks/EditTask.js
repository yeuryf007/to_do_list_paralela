import React, { Component } from "react";

const EditTask = () => {
    return (
        <div className="container section todo-edit">
            <div className="card z-depth-0">
                <div className="card-content">
                    <form className="">
                        <h5 className="grey-text text-darken-3">Edit Task</h5>
                        <div className="input">
                            <label htmlFor="title">Task Name</label>
                            <input type="text" id="title" data-length="10" />
                        </div>
                        <div className="input">
                            <label htmlFor="description">Task Description</label>
                            <textarea id="description" className="materialize-textarea" data-length="120" ></textarea>
                        </div>
                        <div className="input-field">
                            <label htmlFor="date" className="active">Task Date</label>
                            <input type="date" id="date" />
                        </div>
                        <div className="input-field">
                            <button className="btn pink lighten-1 z-depth-0">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTask;