import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

export default function TaskForm({ onSubmit, editingTask }) {
    const [title, setTitle] = useState("");
    const [createdAt, setCreatedAt] = useState(new Date().toISOString().split("T")[0]);
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
    const [category, setCategory] = useState("None");
    const [description, setDesc] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if(editingTask) {
            setTitle(editingTask.title);
            setCreatedAt(editingTask.createdAt.split('T')[0]);
            setDueDate(editingTask.dueDate.split('T')[0]);
            setCategory(editingTask.category);
            setDesc(editingTask.description);
            setStatus(editingTask.status);
        }
        else {
            setTitle("");
            setCreatedAt(new Date().toISOString().split("T")[0]);
            setDueDate(new Date().toISOString().split("T")[0]);
            setCategory("None");
            setDesc("");
            setStatus("Pending");
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim())
            return;
        let doneBool = status === "Done";
        onSubmit({ title, completed: doneBool, createdAt: new Date(createdAt), dueDate: new Date(dueDate), category, description, status });
        setTitle("");
        setCreatedAt(new Date().toISOString().split("T")[0]);
        setDueDate(new Date().toISOString().split("T")[0]);
        setCategory("None");
        setDesc("");
        setStatus("Pending");
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <fieldset>
                <div className="form-group">
                    <label>Task Title:</label>
                    <input type="text" placeholder="Enter Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Creation Date:</label>
                    <input type="date" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <input type="text" placeholder="Enter Task Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Status:</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea rows="10" cols="50" placeholder="Enter Task Description" value={description} onChange={(e) => setDesc(e.target.value)} />
                </div>
            </fieldset>
            <button className="form-button" type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
        </form>
    );
}
