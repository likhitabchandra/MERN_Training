import { Link } from "react-router-dom";

function TaskCard(props){
    return(
        <div className="task-card">
            <h3>{props.title} </h3>
            <p>{props.description} </p>
            <p>{props.status}</p>
            <Link className="details-link" to={`/tasks/${props.id}`}>View details</Link>
            <button onClick={props.onToggle}>change status</button>
            <button onClick={props.onDelete}>Delete task</button>
        </div>
    );

}
export default TaskCard;
