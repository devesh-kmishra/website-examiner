import { configDotenv } from "dotenv";
import { Config } from "drizzle-kit";

configDotenv();

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  connectionString: process.env.DATABASE_URL!,
} satisfies Config;
