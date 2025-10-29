ALTER TABLE "definitions" RENAME COLUMN "definition" TO "value";--> statement-breakpoint
ALTER TABLE "translations" RENAME COLUMN "translation" TO "value";--> statement-breakpoint
ALTER TABLE "definitions" DROP CONSTRAINT "definition_unique";--> statement-breakpoint
ALTER TABLE "translations" DROP CONSTRAINT "translations_unique";--> statement-breakpoint
ALTER TABLE "definitions" ADD CONSTRAINT "definition_unique" UNIQUE("word_id","value");--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_unique" UNIQUE("word_id","definition_id","value");