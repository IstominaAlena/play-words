import "dotenv/config";
import { db } from "./db";
import { usersTable } from "./schema";

async function main() {
  // Fetch all users
  const users = await db.select().from(usersTable);
  console.log("Users:", users);

  // Optional: insert a test user
  // await db.insert(usersTable).values({ name: 'Alice', age: 25, email: 'alice@example.com' });
}

main().catch(console.error);
