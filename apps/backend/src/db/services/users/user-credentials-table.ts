import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { userCredentialsTable } from "@/db/schemas/user-schemas";
import { CreateUserCredentials, UpdateUserCredentials, UsersTable } from "@/types/users";

export class UserCredentialsService {
    private table = userCredentialsTable;

    async createUserCredentials(data: CreateUserCredentials) {
        const result = await db.insert(this.table).values(data).returning({ id: this.table.id });
        return result[0]?.id ?? null;
    }

    async getCredentialsByUserId(id: UsersTable["id"]) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(userCredentialsTable.userId, id))
            .limit(1);

        return result[0] ?? null;
    }

    async deleteUsersCredentials(id: UsersTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async updateUserCredentials(id: UsersTable["id"], data: UpdateUserCredentials) {
        await db.update(this.table).set(data).where(eq(this.table.userId, id));
    }
}

export const userCredentialsService = new UserCredentialsService();
