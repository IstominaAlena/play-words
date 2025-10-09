import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { tokenService } from "@/services/token-service";
import { ValidateTokenTableType } from "@/types/users";

export class UserTokensService {
    async validateToken(table: ValidateTokenTableType, rawToken: string) {
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
}

export const userTokensService = new UserTokensService();
