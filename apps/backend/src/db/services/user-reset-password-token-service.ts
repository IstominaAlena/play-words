import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { RESET_PASSWORD_TOKEN_TTL_TIME } from "@/constants/common";
import { TokenService } from "@/services/token-service";
import { CreateUserToken, ResetPasswordTokensTable } from "@/types/users";

import { resetPasswordTokensTable } from "../schemas";

export class UserResetPasswordTokenService extends TokenService {
    async createResetPasswordToken(rawData: CreateUserToken) {
        await db
            .delete(resetPasswordTokensTable)
            .where(eq(resetPasswordTokensTable.userId, rawData.userId));

        return db.insert(resetPasswordTokensTable).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${RESET_PASSWORD_TOKEN_TTL_TIME} min'`),
        });
    }

    async validateResetPasswordToken(rawToken: string) {
        return this.validateToken(resetPasswordTokensTable, rawToken);
    }

    async deleteResetPasswordToken(id: ResetPasswordTokensTable["id"]) {
        await db.delete(resetPasswordTokensTable).where(eq(resetPasswordTokensTable.id, id));
    }
}

export const userResetPasswordTokenService = new UserResetPasswordTokenService();
