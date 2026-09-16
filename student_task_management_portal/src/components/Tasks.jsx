import TaskCard from "./TaskCard";

function Tasks({ tasks, isLoading, onToggleTask, onDeleteTask }) {

  return (
    <main className="dashboard-page">
      <h1>Tasks</h1>
      <div className="tasks-container">
        {isLoading ? (
          <p className="empty-state">Loading tasks…</p>
        ) : tasks.length === 0 ? (
          <p className="empty-state">No tasks yet.</p>
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
    </main>
  );
}
export default Tasks;
