import TaskCard from "./TaskCard";
import StatCard from "./StatCard";
import AddTask from "./AddTask";

function Dashboard(props) {

    const totalTasks = props.tasks.length;
    const completedTasks = props.tasks.filter(
        (task) => task.status.toLowerCase() === "completed"
    ).length;
    const pendingTasks = props.tasks.filter(
        (task) => task.status.toLowerCase() === "pending"
    ).length;

    return (
        <main>
        
            <div className="stack-container">
                <StatCard title="Total Tasks" value={totalTasks}/>
                <StatCard title="Completed" value={completedTasks}/>
                <StatCard title="Pending" value={pendingTasks}/>
                
            </div>

            <AddTask onAddTask={props.onAddTask}/>

            <h2>Recent Tasks</h2>

            <div className="task-container">
                {props.tasks.map((task)=>(
                    <TaskCard 
                        key={task._id || task.id}
                        id={task._id || task.id}
                        title={task.title} 
                        description={task.description} 
                        status={task.status}
                        onToggle={() => props.onToggleTask(task)}
                        onDelete={() => props.onDeleteTask(task._id || task.id)}
                    />
                ))}
            </div>

        </main>
    );
}

export default Dashboard;