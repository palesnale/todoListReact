import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const URL = "http://localhost:500/api/tasks";

export default function TaskDisplay({ tasks, onDelete, onEdit, toggleDone }) {
    return (
        <table className="task-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Due Date</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Done?</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className={task.completed ? 'strikethrough': ''}>
                    <td>{task.title}</td>
                    <td>{task.createdAt.split('T')[0]}</td>
                    <td>{task.dueDate.split('T')[0]}</td>
                    <td>{task.category}</td>
                    <td>{task.description}</td>
                    <td>{task.status}</td>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleDone(task)}/>
                    </td>
                    <td>
                        <button onClick={() => onEdit(task)}>Edit</button>
                        <button onClick={() => onDelete(task)}>Delete</button>
                    </td>
                  </tr> 
                ))}
            </tbody>
        </table>
    );
}
