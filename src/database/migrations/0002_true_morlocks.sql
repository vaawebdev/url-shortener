ALTER TABLE "urls" RENAME COLUMN "short_url" TO "short_code";--> statement-breakpoint
ALTER TABLE "urls" DROP CONSTRAINT "urls_short_url_unique";--> statement-breakpoint
DROP INDEX "short_url_idx";--> statement-breakpoint
ALTER TABLE "urls" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "short_code_idx" ON "urls" USING btree ("short_code");--> statement-breakpoint
ALTER TABLE "urls" ADD CONSTRAINT "urls_short_code_unique" UNIQUE("short_code");