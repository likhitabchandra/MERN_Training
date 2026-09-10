function TaskCard(props){
    return(
        <div className="task-card">
            <h3>{props.title} </h3>
            <p>{props.description} </p>
            <p>{props.status}</p>
            <button onClick={props.onToggle}>change status</button>
        </div>
    );

}
export default TaskCard;