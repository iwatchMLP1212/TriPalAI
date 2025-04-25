CREATE TABLE "flashcard_sets" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"user_email" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "flashcards" ADD COLUMN "flashcard_set_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcard_sets" ADD CONSTRAINT "flashcard_sets_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_flashcard_set_id_flashcard_sets_id_fk" FOREIGN KEY ("flashcard_set_id") REFERENCES "public"."flashcard_sets"("id") ON DELETE cascade ON UPDATE no action;