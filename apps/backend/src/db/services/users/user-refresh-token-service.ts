import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";
import { refreshTokensTable } from "@/db/schemas/user-schemas";
import { TokenService } from "@/services/token-service";
import { CreateRefreshToken, RefreshTokensTable, UsersTable } from "@/types/users";

export class UserRefreshTokenService extends TokenService {
    private table = refreshTokensTable;

    async createRefreshToken(rawData: Pick<CreateRefreshToken, "userId" | "tokenHash">) {
        await db.delete(this.table).where(eq(this.table.userId, rawData.userId));

        const result = await db
            .insert(this.table)
            .values({
                ...rawData,
                expiresAt: sql.raw(`now() + interval '${REFRESH_TOKEN_TTL_DAYS} days'`),
            })
            .returning({ id: this.table.id });
        return result[0]?.id ?? null;
    }

    async getRefreshTokenByUserId(id: UsersTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.userId, id)).limit(1);
        return result[0] ?? null;
    }

    async deleteRefreshToken(id: RefreshTokensTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async validateRefreshToken(rawToken: string) {
        return this.validateToken(this.table, rawToken);
    }
}

export const userRefreshTokenService = new UserRefreshTokenService();
