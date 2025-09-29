import "dotenv/config";

import { db } from "@/config/drizzle-orm/db";

import { usersTable } from "./schemas/users";

async function seed() {
    await db.insert(usersTable).values([
        { name: "Alice", age: 25, email: "alice@example.com" },
        { name: "Bob", age: 30, email: "bob@example.com" },
    ]);
    console.log("Seed data inserted!");
}

seed().catch(console.error);
