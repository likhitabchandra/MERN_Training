import { Link, useParams } from "react-router-dom";

function TaskDetails({ tasks, isLoading }){
    const { id } = useParams();/*read id of colon id  */
    const task = tasks.find((currentTask) => String(currentTask.id) === id);

    if (isLoading) {
        return <main className="task-details-page"><p className="empty-state">Loading task…</p></main>;
    }

    if (!task) {
        return (
            <main className="task-details-page">
                <section className="task-details-card">
                    <h1>Task not found</h1>
                    <Link className="details-link" to="/tasks">Back to tasks</Link>
                </section>
            </main>
        );
    }
    return(
        <main className="task-details-page">
          <section className="task-details-card">
            <h1>Task details</h1>
            <h2>{task.title}</h2>
            <p className="task-description">{task.description || "No description provided."}</p>
            <p className="task-status">{task.status}</p>
            <Link className="details-link" to="/tasks">Back to tasks</Link>
          </section>
        </main>
    );
}
export default TaskDetails;
