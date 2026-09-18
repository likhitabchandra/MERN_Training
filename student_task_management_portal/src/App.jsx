import "./App.css"
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Routes, Route, data} from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { useState , useEffect} from "react";
import Login from "./components/Login";
import Register from "./components/Register";
function App(){
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    async function loadTasks() {
      try {
        setError("");
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) {
          throw new Error("Unable to load tasks");
        }
        const taskData = await response.json();
        setTasks(taskData);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setError("Unable to load tasks. Make sure the backend server is running.");
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
},[]);

  async function addTask(task) {
    try {
      setError("");
      const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!response.ok) throw new Error("Unable to add task");
      const savedTask = await response.json();
      setTasks((currentTasks) => [...currentTasks, savedTask]);
      return true;
    } catch (requestError) {
      console.error("Failed to add task:", requestError);
      setError("Unable to add the task. Please try again.");
      return false;
    }
  }

  async function toggleTask(task) {
    try {
      setError("");
      const status = task.status === "pending" ? "completed" : "pending";
      const response = await fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error("Unable to update task");
      const savedTask = await response.json();
      setTasks((currentTasks) => currentTasks.map((item) => item.id === task.id ? savedTask : item));
    } catch (requestError) {
      console.error("Failed to update task:", requestError);
      setError("Unable to update the task. Please try again.");
    }
  }

  async function deleteTask(id) {
    try {
      setError("");
      const response = await fetch(`http://localhost:3000/api/tasks/${task._id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(data => {
        if (!data.ok) throw new Error("Unable to delete task");
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
      });
    } catch (requestError) {
      console.error("Failed to delete task:", requestError);
      setError("Unable to delete the task. Please try again.");
    }
  }

  return(
    <div>
      <Navbar />
      {error && <p className="app-error" role="alert">{error}</p>}
    <Routes>
    <Route path="/" element={<Dashboard tasks={tasks} isLoading={isLoading} onAddTask={addTask} onToggleTask={toggleTask} onDeleteTask={deleteTask}/>}/>
    <Route path="/tasks" element={<Tasks tasks={tasks} isLoading={isLoading} onToggleTask={toggleTask} onDeleteTask={deleteTask}/>}/>
    <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} isLoading={isLoading}/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
  </Routes>

    </div>
  );
}

export default App;
