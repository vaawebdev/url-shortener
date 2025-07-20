import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: parseInt(process.env.DATABASE_POOL_MAX!),
});

export const db = drizzle(pool, { schema });
