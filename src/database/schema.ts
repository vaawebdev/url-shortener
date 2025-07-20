import {
  index,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const urls = pgTable(
  "urls",
  {
    id: serial("id").primaryKey(),
    shortCode: varchar("short_code").unique().notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("short_code_idx").on(table.shortCode)]
);

export type Url = typeof urls.$inferSelect;
