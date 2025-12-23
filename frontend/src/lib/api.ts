import { Task } from "@/types/task";

const apiURL = "http://localhost:4000";

export async function createTask(url: string, question: string): Promise<Task> {
  const res = await fetch(`${apiURL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, question }),
  });

  if (!res.ok) {
    throw new Error("Failed to create task");
  }

  return res.json();
}

export async function getTask(id: string): Promise<Task> {
  const res = await fetch(`${apiURL}/tasks/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch task");
  }

  return res.json();
}
