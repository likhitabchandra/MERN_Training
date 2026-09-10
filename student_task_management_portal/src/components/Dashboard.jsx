import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import { useState } from "react";   
import AddTask from "./AddTask";

function Dashboard(){
    const [tasks, setTasks]=useState([{id:1,title:"learn react", 
        description:"understanding components" ,
        status:"pending"},
        {id:2,title:"learn SQL",
             description:"understanding queries",
              status:"completed"},
        {id:3,title:"learn DSA",
             description:"understanding ",
             status:"completed"}]);
             function toggleTask(id){
                setTasks((currentTasks) =>
                    currentTasks.map((task) =>
                        task.id === id
                            ? {
                                ...task,
                                status: task.status === "pending" ? "completed" : "pending",
                            }
                            : task
                    )
                );
    }

    function addTask({ title, description }) {
        setTasks((currentTasks) => [
            ...currentTasks,
            {
                id: Date.now(),
                title,
                description,
                status: "pending",
            },
        ]);
    }
    return(
        <main>

            <div className="stack-container">
                <StatCard title ={"total tasks"} value={"10"}/>
                <StatCard title={"completed"} value={"6"}/>
                <StatCard title={"pending"} value={"5"} />
            </div>
            <AddTask onAddTask={addTask} />
            <h2>Recent Tasks</h2>
            <div className="task-container">
                {tasks.map((task)=>(<TaskCard key={task.id} title={task.title} description={task.description} status={task.status} 
                onToggle={()=>toggleTask(task.id)}/>
            ))};
            </div>
        </main>

    );
}

export default Dashboard;
