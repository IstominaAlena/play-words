import { eq } from "drizzle-orm";

import { User } from "@repo/common/types/users";

import { db } from "@/config/drizzle-orm/db";
import { usersTable } from "@/db/schemas/users";

export const deleteUser = async (id: User["id"]) =>
    await db.delete(usersTable).where(eq(usersTable.id, id));
