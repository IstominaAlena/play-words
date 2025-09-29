import { db } from "@/config/drizzle-orm/db";
import { usersTable } from "@/db/schemas/users";
import { InsertUser } from "@/types/tables";

export async function createUser(data: InsertUser) {
    await db.insert(usersTable).values(data);
}
