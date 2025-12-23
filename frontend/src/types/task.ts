export type Task = {
  id: string;
  url: string;
  question: string;
  status: "queued" | "processing" | "completed" | "failed";
  answer: string | null;
  created_at: string;
  updated_at: string;
};
