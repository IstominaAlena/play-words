import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS, RESET_PASSWORD_TOKEN_TTL_TIME } from "@/constants/common";
import { tokenService } from "@/services/token-service";
import {
    CreateUserToken,
    RefreshTokensTable,
    ResetPasswordTokensTable,
    ValidateTokenTableType,
} from "@/types/users";

import { refreshTokensTable, resetPasswordTokensTable } from "../schemas";

export class UserTokensService {
    private async validateToken(table: ValidateTokenTableType, rawToken: string) {
        const tokenHash = tokenService.hashToken(rawToken);

        const tokenRecord = await db
            .select()
            .from(table)
            .where(eq(table.tokenHash, tokenHash))
            .limit(1)
            .then((res) => res[0]);

        if (!tokenRecord || new Date(tokenRecord.expiresAt) < new Date()) {
            return null;
        }

        return tokenRecord;
    }

    async createUserRefreshToken(rawData: CreateUserToken) {
        await db.delete(refreshTokensTable).where(eq(refreshTokensTable.userId, rawData.userId));

        return db.insert(refreshTokensTable).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${REFRESH_TOKEN_TTL_DAYS} days'`),
        });
    }

    async createUserResetPasswordToken(rawData: CreateUserToken) {
        await db
            .delete(resetPasswordTokensTable)
            .where(eq(resetPasswordTokensTable.userId, rawData.userId));

        return db.insert(resetPasswordTokensTable).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${RESET_PASSWORD_TOKEN_TTL_TIME} min'`),
        });
    }

    async validateRefreshToken(rawToken: string) {
        return this.validateToken(refreshTokensTable, rawToken);
    }

    async validateResetPasswordToken(rawToken: string) {
        return this.validateToken(resetPasswordTokensTable, rawToken);
    }

    async deleteUserRefreshToken(id: RefreshTokensTable["id"]) {
        await db.delete(refreshTokensTable).where(eq(refreshTokensTable.id, id));
    }

    async deleteUserResetPasswordToken(id: ResetPasswordTokensTable["id"]) {
        await db.delete(resetPasswordTokensTable).where(eq(resetPasswordTokensTable.id, id));
    }
}

export const userTokensService = new UserTokensService();
