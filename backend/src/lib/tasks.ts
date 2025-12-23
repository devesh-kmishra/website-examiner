import { db } from "./drizzle";
import { tasks } from "./db/schema";
import { eq } from "drizzle-orm";

export async function createTask(url: string, question: string) {
  const [task] = await db.insert(tasks).values({ url, question }).returning();

  return task;
}

export async function getTaskById(id: string) {
  const [task] = await db.select().from(tasks).where(eq(tasks.id, id));

  return task;
}

export async function updateTaskStatus(
  id: string,
  status: "queued" | "processing" | "completed" | "failed",
  answer?: string
) {
  await db
    .update(tasks)
    .set({
      status,
      answer,
      updatedAt: new Date(),
    })
    .where(eq(tasks.id, id));
}
