import { asc } from "drizzle-orm";
import { eq } from "drizzle-orm";

import { User } from "@repo/common/types/users";

import { db } from "@/config/drizzle-orm/db";
import { messageKeys } from "@/constants/common";
import { usersTable } from "@/db/schemas";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { CreateUser, UpdateUser } from "@/types/users";
import { UsersTable } from "@/types/users";

import { userRefreshTokenService } from "./user-refresh-token-service";

export class UsersService {
    private static safeUserFields = {
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
    };

    private async getUserByField<K extends keyof UsersTable>(
        field: K,
        value: UsersTable[K],
    ): Promise<UsersTable | null> {
        const result = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable[field], value))
            .limit(1);

        return result[0] ?? null;
    }

    async createUser(data: CreateUser) {
        const [newUser] = await db
            .insert(usersTable)
            .values(data)
            .returning(UsersService.safeUserFields);

        if (!newUser?.id) {
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        const { token, tokenHash } = tokenService.generateTokenPair();

        try {
            await userRefreshTokenService.createRefreshToken({
                userId: newUser.id,
                tokenHash,
            });

            return { newUser, refreshToken: token };
        } catch (error) {
            await this.deleteUser(newUser.id);
            throw error;
        }
    }

    async deleteUser(id: User["id"]) {
        await db.delete(usersTable).where(eq(usersTable.id, id));
    }

    async updateUser(id: User["id"], data: UpdateUser): Promise<User | null> {
        if (!data || Object.keys(data).length === 0) return null;

        const [updated] = await db
            .update(usersTable)
            .set(data)
            .where(eq(usersTable.id, id))
            .returning(UsersService.safeUserFields);

        return updated ?? null;
    }

    async getUserById(id: UsersTable["id"]) {
        return await this.getUserByField("id", id);
    }

    async getUserByEmail(email: UsersTable["email"]) {
        return await this.getUserByField("email", email);
    }

    async getSafeUserById(id: UsersTable["id"]): Promise<User | null> {
        const result = await db
            .select(UsersService.safeUserFields)
            .from(usersTable)
            .where(eq(usersTable.id, id))
            .limit(1);

        return result[0] ?? null;
    }

    async getAllUsers(page = 1, pageSize = 5): Promise<User[]> {
        return await db
            .select()
            .from(usersTable)
            .groupBy(usersTable.id)
            .orderBy(asc(usersTable.id))
            .limit(pageSize)
            .offset((page - 1) * pageSize);
    }
}

export const usersService = new UsersService();
