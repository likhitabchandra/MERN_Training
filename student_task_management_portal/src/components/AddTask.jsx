import { useState } from "react";

function AddTask({ onAddTask }){
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");

    
    async function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim()) return;

        onAddTask({
            title: title.trim(),
            description: description.trim(),
        });
        setTitle("");
        setDescription("");
        const response = await fetch("http://localhost:3000/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title.trim(),
                description: description.trim()
            })
        });
    }

    return(
        <form className="add-task-form" onSubmit={handleSubmit}>
            <h2>Add task</h2>
            <label htmlFor="task-title">Title</label>
            <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <label htmlFor="task-description">Description</label>
            <input
            id="task-description"
            type="text"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            />
            <button type="submit">Add task</button>
        </form>
    );
}
export default AddTask;
