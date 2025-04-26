import { db } from "./db"; // Assuming you have a db instance
import {
  users,
  bots,
  conversations,
  messages,
  flashcards,
  flashcardSets,
} from "./schema";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear tables (watch your dependencies order to avoid FK errors)
  await db.delete(messages);
  await db.delete(conversations);
  await db.delete(flashcards);
  await db.delete(flashcardSets);
  await db.delete(bots);
  await db.delete(users);

  // Seed users
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        name: "Alice",
        email: "alice@example.com",
        image_url: "https://picsum.photos/200",
      },
      {
        name: "Bob",
        email: "bob@example.com",
        image_url: "https://picsum.photos/200",
      },
    ])
    .returning();

  // Seed bots
  const insertedBots = await db
    .insert(bots)
    .values([
      {
        name: "Math",
        image_url: "https://picsum.photos/200",
        type: "math",
        desc: "Học toán",
      },
      {
        name: "BOT_TEST",
        image_url: "https://picsum.photos/200",
        type: "chat",
        desc: "Friendly conversation bot",
      },
    ])
    .returning();

  // Seed conversations
  const insertedConversations = await db
    .insert(conversations)
    .values([
      {
        name: "Alice Study Session",
        slug: "alice-study-session",
        user_id: insertedUsers[0].id,
        bot_id: insertedBots[0].id,
      },
      {
        name: "Bob Chat Session",
        slug: "bob-chat-session",
        user_id: insertedUsers[1].id,
        bot_id: insertedBots[1].id,
      },
    ])
    .returning();

  // Seed messages
  await db.insert(messages).values([
    {
      content: "Hello Bot!",
      is_outgoing: true,
      conversation_id: insertedConversations[0].id,
    },
    {
      content: "Hi there, how can I help you study today?",
      is_outgoing: false,
      conversation_id: insertedConversations[0].id,
    },
  ]);

  // Seed flashcard sets
  const insertedFlashcardSets = await db
    .insert(flashcardSets)
    .values([
      {
        title: "Biology 101",
        description: "Intro to Biology",
        user_email: insertedUsers[0].email,
        is_completed: false,
      },
      {
        title: "History Basics",
        description: "World history overview",
        user_email: insertedUsers[1].email,
        is_completed: false,
      },
    ])
    .returning();

  // Seed flashcards
  await db.insert(flashcards).values([
    {
      front: "What is the powerhouse of the cell?",
      back: "Mitochondria",
      user_email: insertedUsers[0].email,
      flashcard_set_id: insertedFlashcardSets[0].id,
    },
    {
      front: "When did WW2 end?",
      back: "1945",
      user_email: insertedUsers[1].email,
      flashcard_set_id: insertedFlashcardSets[1].id,
    },
  ]);

  console.log("✅ Done seeding");
}

seed().catch((err) => {
  console.error("❌ Error seeding:", err);
  process.exit(1);
});
