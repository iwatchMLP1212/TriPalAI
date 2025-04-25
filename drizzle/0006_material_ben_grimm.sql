ALTER TABLE "flashcard_sets" ADD COLUMN "is_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcard_sets" ADD COLUMN "last_studied" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "flashcard_sets" ADD COLUMN "flashcards_count" integer DEFAULT 0 NOT NULL;