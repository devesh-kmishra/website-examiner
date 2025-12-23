"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, getTask } from "@/lib/api";
import { Task } from "@/types/task";

export default function Home() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");

  const createTaskMutation = useMutation({
    mutationFn: () => createTask(url, question),
    onSuccess: (data) => {
      setTaskId(data.id);
    },
  });

  const taskQuery = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => getTask(taskId!),
    enabled: !!taskId,
    refetchInterval: (data) => {
      return data.state.data?.status === "completed" ? false : 3000;
    },
  });

  return (
    <div className="h-screen w-full flex flex-col gap-4 items-center p-4">
      <h1 className="text-center">Website Examiner</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTaskMutation.mutate();
        }}
        className="w-xl border border-black/20 rounded-lg flex flex-col p-4 gap-4"
      >
        <input
          placeholder="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-black/20 rounded-md p-2"
        />
        <br />
        <textarea
          placeholder="Your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border border-black/20 rounded-md p-2"
        />
        <br />
        <div className="self-center flex gap-4">
          <button
            type="button"
            className="w-48 border-0 rounded-md p-2 bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              setUrl("");
              setQuestion("");
            }}
          >
            Clear
          </button>
          <button
            type="submit"
            className="w-48 border-0 rounded-md p-2 bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>

      {taskQuery.data && (
        <div className="w-full flex flex-col gap-4 p-4">
          <pre className="text-xl text-center">
            Status: {taskQuery.data.status}
          </pre>
          {taskQuery.data.answer && (
            <p className="italic p-4 bg-blue-500/40 border-0 rounded-lg">
              {taskQuery.data.answer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
