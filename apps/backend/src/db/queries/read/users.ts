import { asc, eq } from "drizzle-orm";

import { User } from "@repo/common/types/users";

import { db } from "@/config/drizzle-orm/db";
import { usersTable } from "@/db/schemas/users";
import { UsersTable } from "@/types/users";

export const getUserById = async (id: UsersTable["id"]): Promise<User[]> =>
    db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);

export const getUserByEmail = async (email: UsersTable["email"]): Promise<User[]> =>
    db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);

export const getAllUsers = async (page = 1, pageSize = 5): Promise<User[]> =>
    db
        .select()
        .from(usersTable)
        .groupBy(usersTable.id)
        .orderBy(asc(usersTable.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);
