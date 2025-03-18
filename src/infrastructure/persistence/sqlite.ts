
import { drizzle } from 'drizzle-orm/bun-sqlite';

const db = drizzle(process.env.DB_FILE_NAME || "./db.sqlite");

export default db;
export * from 'bun:sqlite';