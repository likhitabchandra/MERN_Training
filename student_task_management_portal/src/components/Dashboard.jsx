import TaskCard from "./TaskCard";
import StatCard from "./StatCard";
import AddTask from "./AddTask";

function Dashboard({ tasks, isLoading, onAddTask, onToggleTask, onDeleteTask }) {

    const totalTasks = tasks.length;
    const remainingTasks = tasks.filter((task) => task.status === "pending").length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;

    return (
        <main className="dashboard-page">
            <div className="stack-container">
                <StatCard title={"Total Tasks"} value={totalTasks} />
                <StatCard title={"Remaining Tasks"} value={remainingTasks} />
                <StatCard title={"Completed Tasks"} value={completedTasks} />
            </div>

            <AddTask onAddTask={onAddTask} />

            <section className="task-section">
                <h2>Recent Tasks</h2>
                <div className="task-container">
                    {isLoading ? (
                        <p className="empty-state">Loading tasks…</p>
                    ) : tasks.length === 0 ? (
                        <div className="empty-state">No tasks yet. Add one to get started.</div>
                    ) : (
                        tasks.map((task) => (
                            <TaskCard
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                status={task.status}
                                onToggle={() => onToggleTask(task)}
                                onDelete={() => onDeleteTask(task.id)}
                            />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
