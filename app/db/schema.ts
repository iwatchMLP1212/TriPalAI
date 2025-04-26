import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  index,
  pgEnum,
} from "drizzle-orm/pg-core";

// Personality colors
export const PersonalityColor = pgEnum(`personality_colors`, [
  "blue",
  "green",
  "yellow",
  "orange",
]);

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  image_url: text("image"),
  personality_color: PersonalityColor("personality_color"),
});

// Bots table
export const bots = pgTable("bots", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  image_url: text("image_url").notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  desc: varchar("desc", { length: 1024 }).notNull(),
});

// Conversations table
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  last_open: timestamp("last_open", { withTimezone: true })
    .defaultNow()
    .notNull(),
  user_id: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
  bot_id: integer("bot_id").references(() => bots.id, {
    onDelete: "cascade",
  }),
});

// Messages table
export const messages = pgTable(
  "messages",
  {
    id: serial("id").primaryKey(),
    content: text("content").notNull(),
    is_outgoing: boolean("is_outgoing").notNull(),
    timestamp: timestamp("timestamp", { withTimezone: true }).defaultNow(),
    conversation_id: integer("conv_id")
      .references(() => conversations.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => ({
    conversationIdx: index("idx_messages_conversation").on(
      table.conversation_id
    ),
    timestampIdx: index("idx_messages_timestamp").on(table.timestamp),
    conversationTimestampIdx: index("idx_messages_conv_time").on(
      table.conversation_id,
      table.timestamp
    ),
  })
);

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  front: text("front").notNull(),
  back: text("back").notNull(),
  user_email: text("user_email")
    .references(() => users.email, { onDelete: "cascade" })
    .notNull(),
  flashcard_set_id: integer("flashcard_set_id")
    .references(() => flashcardSets.id, { onDelete: "cascade" })
    .notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const flashcardSets = pgTable("flashcard_sets", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  user_email: text("user_email")
    .references(() => users.email, { onDelete: "cascade" })
    .notNull(),
  is_completed: boolean("is_completed").default(false).notNull(),
  last_studied: timestamp("last_studied", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  flashcards_count: integer("flashcards_count").default(0).notNull(),
});
