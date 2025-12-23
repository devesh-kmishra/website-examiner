import { Worker } from "bullmq";
import { redis } from "./redis";
import { db } from "./drizzle";
import { tasks } from "./db/schema";
import { eq } from "drizzle-orm";
import { scrapeWebsite } from "./scraper";
import { askAI } from "./ai";
import { updateTaskStatus } from "./tasks";

new Worker(
  "tasks",
  async (job) => {
    const { taskId } = job.data;

    try {
      const [task] = await db.select().from(tasks).where(eq(tasks.id, taskId));

      if (!task) {
        throw new Error("Task not found");
      }

      await updateTaskStatus(taskId, "processing");

      const websiteText = await scrapeWebsite(task.url);

      const aiAnswer = await askAI(websiteText, task.question);

      await updateTaskStatus(taskId, "completed", aiAnswer);
    } catch (error) {
      console.error("Worker error:", error);

      await updateTaskStatus(
        taskId,
        "failed",
        "AI request or website scraping failed"
      );

      throw error;
    }
  },
  { connection: redis }
);

console.log("BullMQ working");
