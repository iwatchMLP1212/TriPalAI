CREATE TABLE "bots" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL,
	"type" varchar(255) NOT NULL,
	"desc" varchar(1024) NOT NULL,
	CONSTRAINT "bots_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" uuid DEFAULT gen_random_uuid() NOT NULL,
	"last_open" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" integer,
	"bot_id" integer
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"is_outgoing" boolean NOT NULL,
	"timestamp" timestamp with time zone DEFAULT now(),
	"conv_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_bot_id_bots_id_fk" FOREIGN KEY ("bot_id") REFERENCES "public"."bots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conv_id_conversations_id_fk" FOREIGN KEY ("conv_id") REFERENCES "public"."conversations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_messages_conversation" ON "messages" USING btree ("conv_id");--> statement-breakpoint
CREATE INDEX "idx_messages_timestamp" ON "messages" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "idx_messages_conv_time" ON "messages" USING btree ("conv_id","timestamp");