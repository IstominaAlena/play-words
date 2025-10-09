import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";
import { TokenService } from "@/services/token-service";
import { CreateUserToken, RefreshTokensTable } from "@/types/users";

import { refreshTokensTable } from "../schemas";

export class UserRefreshTokenService extends TokenService {
    async createRefreshToken(rawData: CreateUserToken) {
        await db.delete(refreshTokensTable).where(eq(refreshTokensTable.userId, rawData.userId));

        return db.insert(refreshTokensTable).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${REFRESH_TOKEN_TTL_DAYS} days'`),
        });
    }

    async validateRefreshToken(rawToken: string) {
        return this.validateToken(refreshTokensTable, rawToken);
    }

    async deleteRefreshToken(id: RefreshTokensTable["id"]) {
        await db.delete(refreshTokensTable).where(eq(refreshTokensTable.id, id));
    }
}

export const userRefreshTokenService = new UserRefreshTokenService();
