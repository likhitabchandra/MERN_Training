import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function Dashboard({ tasks, setTasks }){
    function toggleTask(id) {
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
        setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    }

    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status === "pending").length;

    return (
        <main>
            <div className="stack-container">
                <StatCard title={"total tasks"} value={total} />
                <StatCard title={"completed"} value={completed} />
                <StatCard title={"pending"} value={pending} />
            </div>

            <AddTask onAddTask={addTask} />

            <h2>Recent Tasks</h2>
            <div className="task-container">
                {tasks.length === 0 ? (
                    <p>No tasks yet. Add a task to get started.</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                            onToggle={() => toggleTask(task.id)}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default Dashboard;
