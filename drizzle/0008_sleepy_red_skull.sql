ALTER TABLE "messages" ALTER COLUMN "conv_id" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "idx_messages_conversation" ON "messages" USING btree ("conv_id");--> statement-breakpoint
CREATE INDEX "idx_messages_timestamp" ON "messages" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "idx_messages_conv_time" ON "messages" USING btree ("conv_id","timestamp");