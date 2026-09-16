const express = require("express")
const cors=require("cors")
const app=express();
app.use(cors());
app.use(express.json());
const tasks = [
  { id: 1, title: "learn react", description: "understanding components", status: "pending" },
  { id: 2, title: "learn SQL", description: "understanding queries", status: "completed" },
  { id: 3, title: "learn DSA", description: "understanding", status: "completed" },
];

app.get("/api/tasks", (req, res) => {
  console.log("/api/tasks requested - returning tasks:\n", tasks);
  res.json(tasks);
});
app.get("/api/tasks/:id", (req, res) => {
  const taskId = number(req.params.id);
  const task = tasks.find((t) => task.id === id);
  if (!task) {
    console.warn("/api/tasks/:id requested - task not found:", id);
    return res.status(404).json({ error: "Task not found" });
  }
  console.log("/api/tasks/:id requested - returning task:\n", task);
  res.json(task);
})

app.post("/api/tasks", (req, res) => {
  const newtask = req.body;
  if (!newtask || typeof newtask !== "object") {
    console.warn("/api/tasks POST - invalid body:", newtask);
    return res.status(400).json({ error: "Invalid task body" });
  }
  if (!newtask.id) newtask.id = Date.now();
  if (!newtask.status) newtask.status = "pending";
  tasks.push(newtask);
  console.log("/api/tasks POST - added task. Current tasks:\n", tasks);
  res.json(newtask);
  res.status(201).json(newtask);
});
app.get("/",(req,res)=>{
    res.send("backend is working!!")
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
