import { useParams } from "react-router-dom";

function TaskDetails(props){
    const { id } = useParams();/*read id of colon id  */
    const task = props.tasks.find((task) => task.id === Number(id));

    if (!task) {
        return <p>Task not found.</p>;
    }
    return(
        <div>
            <h1>Task details</h1>
            <h2>{task.title}</h2>
            <p>{task.description} </p>
            <p>status:{task.status}</p>
        </div>
    );
}
export default TaskDetails;
