require("dotenv").config();

// bring express in node.js
const express = require("express");

// installing cors middleware
const cors = require("cors");

// create an express app
const app = express();

// import the Task model
const Task = require("./models/Task");

app.get("/", (req, res) => {
    res.send("Back-end server is running");
});

//mongoose connection
const mongoose = require("mongoose");

app.use(cors()); // use cors middleware to handle requests from different origins
  
app.use(express.json());// use express.json() middleware to parse incoming JSON requests

const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;

if (!mongoUri) {
    throw new Error("MONGO_URI is missing from backend/.env");
}

function isValidTaskId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

//read tasks in backend
 app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error("Error reading tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
    if (!isValidTaskId(req.params.id)) {
      return res.status(400).json({ error: "Invalid task id" });
    }

        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    } catch (error) {
        console.error("Error reading task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// create operation in backend
app.post("/api/tasks", async (req, res) => {
    try{
      const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
    }catch (error) {
        console.error("Error reading task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
  })
// update operation in backend
app.put("/api/tasks/:id",async (req, res) => {
    try{
      if (!isValidTaskId(req.params.id)) {
        return res.status(400).json({message:"Invalid task id"});
      }

  const task = await Task.findByIdAndUpdate(
        req.params.id,
        {status:req.body.status},
        {new:true}
      );
      if(!task){
        return res.status(404).json({message:"task not found"})
      }
      res.json(task);
    }catch(error){
      console.error("Error updating task:", error);
      res.status(500).json({message:"failed to fetch the task"})
      
    }
});

// delete operation in backend
app.delete("/api/tasks/:id",async (req, res) => {
    try{
      if (!isValidTaskId(req.params.id)) {
        return res.status(400).json({message:"Invalid task id"});
      }

      const deletedTask =await Task.findByIdAndDelete(req.params.id)
      if(!deletedTask){
        return res.status(404).json({message:"message not found"})
      }
      res.json(deletedTask);
    }catch(error){
      console.error("Error deleting task:", error);
      res.status(500).json({message:"failed to fetch the task"})
    }
});
async function startServer() {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exitCode = 1;
  }
}

startServer();