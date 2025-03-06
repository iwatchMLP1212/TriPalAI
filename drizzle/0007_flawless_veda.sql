ALTER TABLE "conversations" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "conversations" ADD COLUMN "last_open" timestamp with time zone DEFAULT now() NOT NULL;