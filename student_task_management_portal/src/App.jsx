import "./App.css"
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Routes, Route} from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { useState } from "react";

const initialTasks = [
  { id: 1, title: "learn react", description: "understanding components", status: "pending" },
  { id: 2, title: "learn SQL", description: "understanding queries", status: "completed" },
  { id: 3, title: "learn DSA", description: "understanding", status: "completed" },
];

function App(){
  const [tasks, setTasks] = useState(initialTasks);

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
