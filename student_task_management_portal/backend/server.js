const express = require("express")
const cors=require("cors")
const app=express();
app.use(cors());
const Tasks = [
  { id: 1, title: "learn react", description: "understanding components", status: "pending" },
  { id: 2, title: "learn SQL", description: "understanding queries", status: "completed" },
  { id: 3, title: "learn DSA", description: "understanding", status: "completed" },
];
app.get("/api/tasks",(req,res)=>{
  res.json(Tasks);
});
app.get("/",(req,res)=>{
    res.send("backend is working!!")
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
