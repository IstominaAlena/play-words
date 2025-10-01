import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { usersTable } from "@/db/schemas/users";
import { SelectUser } from "@/types/users";

type UpdateUserInput = Partial<Pick<SelectUser, "name" | "age" | "email">>;

export async function updateUser(
    id: SelectUser["id"],
    data: UpdateUserInput,
): Promise<{
    id: number;
    name: string;
    age: number;
    email: string;
} | null> {
    if (!data || Object.keys(data).length === 0) return null;

    const result = await db.update(usersTable).set(data).where(eq(usersTable.id, id)).returning({
        id: usersTable.id,
        name: usersTable.name,
        age: usersTable.age,
        email: usersTable.email,
    });

    return result[0] ?? null;
}
