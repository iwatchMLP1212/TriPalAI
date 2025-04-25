ALTER TABLE "flashcards" DROP CONSTRAINT "flashcards_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "flashcards" ADD COLUMN "user_email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "flashcards" ADD CONSTRAINT "flashcards_user_email_users_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."users"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "flashcards" DROP COLUMN "user_id";