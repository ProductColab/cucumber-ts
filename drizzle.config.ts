import type { Config } from "drizzle-kit";

export default {
  schema: "./src/infrastructure/persistence/schema/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME || "./db.sqlite",
  },
} satisfies Config; 