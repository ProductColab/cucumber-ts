import { Before, After, BeforeAll } from "@cucumber/cucumber";
import db from "@/infrastructure/persistence/sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

// Run migrations before all tests
BeforeAll(async () => {
  migrate(db, { migrationsFolder: "./drizzle" });
});

// Clean database before each scenario
Before(async function () {
  await this.cleanDatabase();
});

// Clean database after each scenario
After(async function () {
  await this.cleanDatabase();
}); 