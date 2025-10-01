import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";
import { CreateUserToken, UserTokensTable } from "@/types/users";

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

    async getUserTokenByUserId(userId: UserTokensTable["userId"]): Promise<string | null> {
        const result = await db
            .select({ tokenHash: userTokensTable.tokenHash })
            .from(userTokensTable)
            .where(eq(userTokensTable.userId, userId))
            .limit(1);
        return result[0]?.tokenHash ?? null;
    }
}

export const userTokensService = new UserTokensService();
