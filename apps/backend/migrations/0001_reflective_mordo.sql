CREATE TABLE "definitions" (
	"id" serial PRIMARY KEY NOT NULL,
	"word_id" integer NOT NULL,
	"definition" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "translations" (
	"id" serial PRIMARY KEY NOT NULL,
	"word_id" integer NOT NULL,
	"definition_id" integer NOT NULL,
	"translation" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "translations_unique" UNIQUE("word_id","definition_id","translation")
);
--> statement-breakpoint
CREATE TABLE "user_dictionary" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"word_id" integer NOT NULL,
	"definition_id" integer NOT NULL,
	"translation_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_dictionary_unique" UNIQUE("user_id","word_id","definition_id","translation_id")
);
--> statement-breakpoint
CREATE TABLE "words" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "words_value_unique" UNIQUE("value")
);
--> statement-breakpoint
ALTER TABLE "definitions" ADD CONSTRAINT "definitions_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "translations" ADD CONSTRAINT "translations_definition_id_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "public"."definitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dictionary" ADD CONSTRAINT "user_dictionary_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dictionary" ADD CONSTRAINT "user_dictionary_word_id_words_id_fk" FOREIGN KEY ("word_id") REFERENCES "public"."words"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dictionary" ADD CONSTRAINT "user_dictionary_definition_id_definitions_id_fk" FOREIGN KEY ("definition_id") REFERENCES "public"."definitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_dictionary" ADD CONSTRAINT "user_dictionary_translation_id_translations_id_fk" FOREIGN KEY ("translation_id") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;