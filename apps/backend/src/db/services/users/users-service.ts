import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { messageKeys } from "@/constants/common";
import { usersTable } from "@/db/schemas/user-schemas";
import { AppError } from "@/services/error-service";
import { CreateUser, UpdateUser } from "@/types/users";
import { UsersTable } from "@/types/users";

export class UsersService {
    private safeUserFields = {
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
    };

    private table = usersTable;

    private async getUserByField<K extends keyof UsersTable>(
        field: K,
        value: UsersTable[K],
    ): Promise<UsersTable | null> {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(usersTable[field], value))
            .limit(1);

        return result[0] ?? null;
    }

    async createUser(data: CreateUser) {
        const [newUser] = await db.insert(this.table).values(data).returning(this.safeUserFields);

        if (!newUser?.id) {
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }
        return newUser;
    }

    async getUserByEmail(email: UsersTable["email"]) {
        return await this.getUserByField("email", email);
    }

    async getUserById(id: UsersTable["id"]) {
        return await this.getUserByField("id", id);
    }

    async getSafeUser(id: UsersTable["id"]) {
        const result = await db
            .select(this.safeUserFields)
            .from(this.table)
            .where(eq(this.table.id, id))
            .limit(1);

        return result[0] ?? null;
    }

    async deleteUserById(id: UsersTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async updateUser(id: UsersTable["id"], data: UpdateUser) {
        const result = await db
            .update(this.table)
            .set(data)
            .where(eq(this.table.id, id))
            .returning(this.safeUserFields);

        return result[0] ?? null;
    }
}

export const usersService = new UsersService();
