import "./App.css"
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Routes, Route} from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { useState , useEffect} from "react";

function App(){
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
    async function loadTasks() {
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) {
          throw new Error("Unable to load tasks");
        }
        const taskData = await response.json();
        console.log("Tasks from API:", taskData);
        setTasks(taskData);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }

    loadTasks();
},[]);

  return(
    <div>
      <Navbar />
    <Routes>
    <Route path="/"element={<Dashboard tasks={tasks} setTasks={setTasks}/>}/>
    <Route path="/tasks"element={<Tasks tasks={tasks} setTasks={setTasks}/>}/>
    <Route path="/tasks/:id"element={<TaskDetails tasks={tasks}/>}/>
  </Routes>

    </div>
  );
}

export default App;
