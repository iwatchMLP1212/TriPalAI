import {
  bots,
  conversations,
  messages,
  users,
  flashcards,
  flashcardSets,
} from "@/db/schema";

// Types of drizzle models
export type User = typeof users.$inferSelect;
export type Bot = typeof bots.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Flashcard = typeof flashcards.$inferSelect;
export type FlashcardSet = typeof flashcardSets.$inferSelect;
