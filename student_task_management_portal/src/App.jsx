import "./App.css"
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { Routes, Route} from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";

function App(){
  return(
    <div>
      <Navbar />
    <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/tasks" element={<Tasks/>}/>
    <Route path="/tasks/:id" element={<TaskDetails/>}/>


  </Routes>

    </div>
  );
}

export default App;
