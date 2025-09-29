import { asc, eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { usersTable } from "@/db/schemas/users";
import { SelectUser } from "@/types/tables";

export async function getUserById(id: SelectUser["id"]): Promise<
    Array<{
        id: number;
        name: string;
        age: number;
        email: string;
    }>
> {
    return db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
}

export async function getAllUsers(
    page = 1,
    pageSize = 5,
): Promise<
    Array<{
        id: number;
        name: string;
        age: number;
        email: string;
    }>
> {
    return db
        .select()
        .from(usersTable)
        .groupBy(usersTable.id)
        .orderBy(asc(usersTable.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
}
