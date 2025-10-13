import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { RESET_PASSWORD_TOKEN_TTL_TIME } from "@/constants/common";
import { resetPasswordTokensTable } from "@/db/schemas/user-schemas";
import { TokenService } from "@/services/token-service";
import { CreateResetPasswordToken, ResetPasswordTokensTable, UsersTable } from "@/types/users";

export class UserResetPasswordTokenService extends TokenService {
    private table = resetPasswordTokensTable;

    async createResetPasswordToken(
        rawData: Pick<CreateResetPasswordToken, "userId" | "tokenHash">,
    ) {
        await db.delete(this.table).where(eq(this.table.userId, rawData.userId));

        return db.insert(this.table).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${RESET_PASSWORD_TOKEN_TTL_TIME} min'`),
        });
    }

    async getResetPasswordTokenByUserId(id: UsersTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.userId, id)).limit(1);
        return result[0] ?? null;
    }

    async deleteResetPasswordToken(id: ResetPasswordTokensTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async validateResetPasswordToken(rawToken: string) {
        return this.validateToken(this.table, rawToken);
    }
}

export const userResetPasswordTokenService = new UserResetPasswordTokenService();
