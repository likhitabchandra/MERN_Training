import TaskCard from "./TaskCard";

function Tasks({ tasks, setTasks }) {
  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "pending" ? "completed" : "pending" }
          : task
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="dashboard-page">
      <h1>Tasks</h1>
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
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
export default Tasks;
