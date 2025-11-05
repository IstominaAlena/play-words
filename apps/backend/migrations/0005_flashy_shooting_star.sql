CREATE TABLE "demo_dictionary" (
	"word_id" serial PRIMARY KEY NOT NULL,
	"word" varchar(255) NOT NULL,
	"translations" text[] NOT NULL,
	"definitions" text[] NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "demo_dictionary_word_unique" UNIQUE("word")
);
