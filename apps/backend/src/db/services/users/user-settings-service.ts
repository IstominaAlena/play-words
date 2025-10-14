import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { userSettingsTable } from "@/db/schemas/user-schemas";
import { CreateUserSettings, UpdateUserSettings, UsersTable } from "@/types/users";

export class UserSettingService {
    private table = userSettingsTable;

    async createUserSettings(data: CreateUserSettings) {
        const result = await db.insert(this.table).values(data).returning({ id: this.table.id });
        return result[0]?.id ?? null;
    }

    async getSettingsByUserId(id: UsersTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.userId, id)).limit(1);

        return result[0] ?? null;
    }

    async deleteUsersSettings(id: UsersTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async updateUserSettings(id: UsersTable["id"], data: UpdateUserSettings) {
        const result = await db
            .update(this.table)
            .set(data)
            .where(eq(this.table.userId, id))
            .returning({ id: this.table.id });
        return result[0]?.id ?? null;
    }
}

export const userSettingService = new UserSettingService();
