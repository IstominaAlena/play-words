ALTER TABLE "user_dictionary" RENAME TO "dictionary";--> statement-breakpoint
ALTER TABLE "translations" DROP CONSTRAINT "translations_unique";--> statement-breakpoint
ALTER TABLE "dictionary" DROP CONSTRAINT "user_dictionary_unique";--> statement-breakpoint
ALTER TABLE "translations" DROP CONSTRAINT "translations_definition_id_definitions_id_fk";
--> statement-breakpoint
ALTER TABLE "dictionary" DROP CONSTRAINT "user_dictionary_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "dictionary" DROP CONSTRAINT "user_dictionary_word_id_words_id_fk";
--> statement-breakpoint
ALTER TABLE "dictionary" DROP CONSTRAINT "user_dictionary_definition_id_definitions_id_fk";
--> statement-breakpoint
ALTER TABLE "dictionary" DROP CONSTRAINT "user_dictionary_translation_id_translations_id_fk";
--> statement-breakpoint
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_definition_id_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "public"."definitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_translation_id_translations_id_fk" FOREIGN KEY ("translation_id") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" DROP COLUMN "definition_id";--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_unique" UNIQUE("word_id","value");--> statement-breakpoint
ALTER TABLE "dictionary" ADD CONSTRAINT "dictionary_unique" UNIQUE("user_id","word_id","definition_id","translation_id");