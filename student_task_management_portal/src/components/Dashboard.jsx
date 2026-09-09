import StatCard from "./StatCard";
import TaskCard from "./TaskCard";

function Dashboard(){
    const tasks=[{id:1,title:"learn React",description:"to be finished in 5 days",status:"pending"},{id:2,title:"learn mern",description:"to be finished in 3 days",status:"pending"},{id:3,title:"learn mongodb",description:"to be finished in 3 days",status:"pending"}];
    return(
        <main>

            <div className="stack-container">
                <StatCard title ={"total tasks"} value={"10"}/>
                <StatCard title={"completed"} value={"6"}/>
                <StatCard title={"pending"} value={"5"} />
            </div>
            <h2>Recent Tasks</h2>
            <div className="task-container">
                {tasks.map((task)=>(<TaskCard key={task.id} title={task.title} description={task.description} status={task.status} />
            ))};
            </div>
        </main>

    );
}
export default Dashboard;