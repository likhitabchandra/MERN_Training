import { useParams } from "react-router-dom";

function TaskDetails(){
    const { id } = useParams();
    return(
        <div>
            <h1>Task details</h1>
            <p>This page will show details of task :{id}.</p>
        </div>
    );
}
export default TaskDetails;
