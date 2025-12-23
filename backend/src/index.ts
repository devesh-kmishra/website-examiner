import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createTask, getTaskById } from "./lib/tasks";
import { taskQueue } from "./lib/queue";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.post("/tasks", async (req, res) => {
  const { url, question } = req.body;

  if (!url || !question) {
    return res.status(400).json({
      error: "URL and Question are required",
    });
  }

  try {
    const task = await createTask(url, question);

    if (!task) {
      return res.status(500).json({ error: "Failed to create task!" });
    }

    await taskQueue.add("new-task", {
      taskId: task.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task!" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await getTaskById(id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
