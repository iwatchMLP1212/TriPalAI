import { bots, conversations, messages, users } from "@/db/schema";

// Types of drizzle models
export type User = typeof users.$inferSelect;
export type Bot = typeof bots.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
