CREATE TYPE "public"."personality_colors" AS ENUM('blue', 'green', 'yellow', 'orange');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "personality_color" "personality_colors";