import { and, eq, isNull, lte, not } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { DELETE_USER_REMAINING_PERIOD, messageKeys } from "@/constants/common";
import { usersTable } from "@/db/schemas/user-schemas";
import { AppError } from "@/services/error-service";
import { CreateUser, UpdateUser } from "@/types/users";
import { UsersTable } from "@/types/users";

export class UsersService {
    private safeFields = {
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
    };

    private table = usersTable;

    async createUser(data: CreateUser) {
        const [newUser] = await db.insert(this.table).values(data).returning(this.safeFields);

        if (!newUser?.id) {
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }
        return newUser;
    }

    async getUserByEmail(email: UsersTable["email"]) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.email, email))
            .limit(1);

        return result[0] ?? null;
    }

    async getUserById(id: UsersTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.id, id)).limit(1);

        return result[0] ?? null;
    }

    async getSafeUser(id: UsersTable["id"]) {
        const result = await db
            .select(this.safeFields)
            .from(this.table)
            .where(eq(this.table.id, id))
            .limit(1);

        return result[0] ?? null;
    }

    async updateUser(id: UsersTable["id"], data: UpdateUser) {
        const result = await db
            .update(this.table)
            .set({ ...data, updatedAt: new Date().toISOString() })
            .where(eq(this.table.id, id))
            .returning(this.safeFields);

        return result[0] ?? null;
    }

    async deleteUser(id: UsersTable["id"]) {
        const now = new Date();

        const deletionDate = new Date(now);
        deletionDate.setDate(now.getDate() + DELETE_USER_REMAINING_PERIOD);

        const result = await db
            .update(this.table)
            .set({
                deletionDate: deletionDate.toISOString(),
                updatedAt: new Date().toISOString(),
            })
            .where(eq(this.table.id, id))
            .returning({ id: this.table.id });

        return result[0]?.id ?? null;
    }

    async restoreUser(id: UsersTable["id"]) {
        const result = await db
            .update(this.table)
            .set({
                deletionDate: null,
                updatedAt: new Date().toISOString(),
            })
            .where(eq(this.table.id, id))
            .returning({ id: this.table.id });

        return result[0]?.id ?? null;
    }

    async hardDeleteUserById(id: UsersTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async getUsersToHardDelete(cutoffDate: string) {
        return await db
            .select()
            .from(this.table)
            .where(
                and(not(isNull(this.table.deletionDate)), lte(this.table.deletionDate, cutoffDate)),
            );
    }
}

export const usersService = new UsersService();
