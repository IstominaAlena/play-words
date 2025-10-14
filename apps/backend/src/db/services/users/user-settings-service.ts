import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { userSettingsTable } from "@/db/schemas/user-schemas";
import { CreateUserSettings, UpdateUserSettings, UsersTable } from "@/types/users";

export class UserSettingService {
    private table = userSettingsTable;

    private safeFields = {
        verified: this.table.verified,
        google: this.table.google,
        password: this.table.password,
        otp: this.table.otp,
    };

    async createUserSettings(data: CreateUserSettings) {
        const result = await db.insert(this.table).values(data).returning(this.safeFields);
        return result[0] ?? null;
    }

    async getSettingsByUserId(id: UsersTable["id"]) {
        const result = await db
            .select(this.safeFields)
            .from(this.table)
            .where(eq(this.table.userId, id))
            .limit(1);

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
            .returning(this.safeFields);
        return result[0] ?? null;
    }
}

export const userSettingService = new UserSettingService();
