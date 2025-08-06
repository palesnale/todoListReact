import { useState, useEffect } from "react";
import React from "react";
import TaskForm from './components/taskForm';
import TaskDisplay from './components/taskDisplay';

const URL = "http://localhost:500/api/tasks";

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState("");
    const [loading, setLoading] = useState(true);
    const [noTasks, setNoTasks] = useState(false);
    const [categories, setCategories] = useState([]);
    const [deadlines, setDeadlines] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        fetch(URL + `/categories`)
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories:", err));
    }, [tasks]);

    useEffect(() => {
        fetch(URL + '/dueDates')
            .then(res => res.json())
            .then(data => setDeadlines(data))
            .catch(err => console.error("Failed to fetch categories:", err));
    }, [tasks]);

    const fetchTasks = async (filters = {}) => {
        const query = new URLSearchParams(filters).toString();
        let data = undefined;
        try {
            const res = await fetch(URL + `?${query}`);
            data = await res.json();
            setTasks(data);

        }
        catch(error) {
            console.log("Error fetching tasks:", error);
        }
        finally{
            setLoading(false);
            if(!data || data.length === 0) {
                console.log("no tasks found");
                setNoTasks(true);
            }
            else
                setNoTasks(false);
        }
    }

    const createTask = async (task) => {
        const res = await fetch(URL, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task),
        });
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setNoTasks(false);
    }

    const updateTask = async (task) => {
        let extension = editingTask ? `/${editingTask._id}` : `/${task._id}`;
        const res = await fetch(URL + extension, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task),
        });
        const updated = await res.json();
        setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)));
        setEditingTask(null);
    }

    const deleteTask = async (task) => {
        await fetch(URL + `/${task._id}`, {method: "DELETE",});
        setTasks(tasks.filter((t) => t._id !== task._id));
        if(tasks.length == 1)
            setNoTasks(true);
    };

    const handleFormSubmit = (task) => {
        editingTask ? updateTask(task) : createTask(task);
    }

    const toggleDone = async (task) => {
        const updatedTask = {
            ...task,
            completed: !task.completed,
            status: task.completed ? "Pending" : "Done"
        }
        await updateTask(updatedTask);
    }

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <fieldset>
                <h2>Filter by:</h2>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Completion Status:</label>
                    <select onChange={(e) => fetchTasks({ status: e.target.value })}>
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select onChange={(e) => fetchTasks({ category: e.target.value })}>
                        <option value="">All</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Due Date:</label>
                    <select onChange={(e) => fetchTasks({ dueDate: e.target.value })}>
                        <option value="">All</option>
                        {deadlines.map((date, index) => (
                            <option key={index} value={date}>{date}</option>
                        ))}
                    </select>
                </div>
            </fieldset>
            {loading ? (<p>Loading tasks...</p>) : 
                (noTasks ? (<p>There are no tasks. Let's add one!</p>) : 
                (<TaskDisplay className="display" tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} toggleDone={toggleDone}/>))}
            <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} />
        </div>
    );
}
