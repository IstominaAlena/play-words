import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { usersTable } from "@/db/schemas/users";
import { SelectUser } from "@/types/tables";

export async function deleteUser(id: SelectUser["id"]) {
    await db.delete(usersTable).where(eq(usersTable.id, id));
}
