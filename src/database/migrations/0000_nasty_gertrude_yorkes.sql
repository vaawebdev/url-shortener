CREATE TABLE "urls" (
	"id" serial PRIMARY KEY NOT NULL,
	"short_url" varchar,
	"url" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "urls_short_url_unique" UNIQUE("short_url")
);
--> statement-breakpoint
CREATE INDEX "short_url_idx" ON "urls" USING btree ("short_url");