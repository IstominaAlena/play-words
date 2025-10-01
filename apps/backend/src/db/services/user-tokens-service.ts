import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";
import { CreateUserToken } from "@/types/users";
import { hashToken } from "@/utils/token";

import { userTokensTable } from "../schemas/users";

export class UserTokensService {
    async createUserToken(rawData: CreateUserToken) {
        await db.delete(userTokensTable).where(eq(userTokensTable.userId, rawData.userId));

        return db.insert(userTokensTable).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${REFRESH_TOKEN_TTL_DAYS} days'`),
            revoked: false,
        });
    }

    async validateRefreshToken(rawToken: string) {
        const tokenHash = hashToken(rawToken);

        const tokenRecord = await db
            .select()
            .from(userTokensTable)
            .where(eq(userTokensTable.tokenHash, tokenHash))
            .limit(1)
            .then((res) => res[0]);

        if (!tokenRecord || tokenRecord.revoked || new Date(tokenRecord.expiresAt) < new Date()) {
            return null;
        }

        return tokenRecord;
    }
}

export const userTokensService = new UserTokensService();
