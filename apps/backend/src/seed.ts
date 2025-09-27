import "dotenv/config";
import { db } from "./db";
import { usersTable } from "./schema";

async function seed() {
  await db.insert(usersTable).values([
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 30, email: "bob@example.com" },
  ]);
  console.log("Seed data inserted!");
}

seed().catch(console.error);
