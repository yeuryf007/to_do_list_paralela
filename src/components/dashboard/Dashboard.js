import React from "react";
import TaskAdding from "../Tasks/TaskAdding";
import ToDoLists from "../Tasks/ToDoLists";

const Dashboard = () => {
    return (
        <div className="dashboard container">
            <div className="row">
                <div className="col s12 m10 offset-m1">
                    <TaskAdding />
                </div>
                <div className="col s12 m10 offset-m1">
                    <ToDoLists />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;