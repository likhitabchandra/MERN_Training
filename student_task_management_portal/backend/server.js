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
  const taskId = Number(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    console.warn("/api/tasks/:id requested - task not found:", taskId);
    return res.status(404).json({ error: "Task not found!" });
  }
  console.log("/api/tasks/:id requested - returning task:\n", task);
  res.json(task);
})

app.put("/api/tasks/:id",(req,res)=>{
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Task id must be a number" });
  }
  const task=tasks.find((task)=>task.id===id);
  if(!task){
        return res.status(404).json({ message:"Task not found!" });
  }
  if (!["pending", "completed"].includes(req.body.status)) {
    return res.status(400).json({ message: "Status must be pending or completed" });
  }
  task.status = req.body.status;
  res.json(task);
})

app.post("/api/tasks", (req, res) => {
  const { title, description = "" } = req.body ?? {};
  if (typeof title !== "string" || !title.trim()) {
    return res.status(400).json({ error: "A task title is required" });
  }
  const newtask = {
    id: Date.now(),
    title: title.trim(),
    description: typeof description === "string" ? description.trim() : "",
    status: "pending",
  };
  tasks.push(newtask);
  console.log("/api/tasks POST - added task. Current tasks:\n", tasks);
  res.status(201).json(newtask);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Task id must be a number" });
  }
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found!" });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});
app.get("/",(req,res)=>{
    res.send("backend is working!!")
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
