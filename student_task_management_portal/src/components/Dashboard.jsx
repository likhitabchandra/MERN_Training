import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard({ tasks, setTasks }){
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

    function deleteTask(id) {
        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );
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
                onToggle={()=>toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
            ))};
            </div>
        </main>

    );
}

export default Dashboard;
