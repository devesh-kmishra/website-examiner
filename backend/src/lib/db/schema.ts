import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  question: text("question").notNull(),
  status: text("status")
    .$type<"queued" | "processing" | "completed" | "failed">()
    .notNull()
    .default("queued"),
  answer: text("answer"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
