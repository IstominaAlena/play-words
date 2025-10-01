import { asc, sql } from "drizzle-orm";
import { eq } from "drizzle-orm";

import { UpdateUserDto, User } from "@repo/common/types/users";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";
import { userTokensTable, usersTable } from "@/db/schemas/users";
import { CreateUser, CreateUserToken } from "@/types/users";
import { UsersTable } from "@/types/users";
import { generateRandomToken, hashToken } from "@/utils/token";

export class UsersService {
    private static userFields = {
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
    };

    private async createUserToken(rawData: CreateUserToken) {
        return db.insert(userTokensTable).values({
            ...rawData,
            expiresAt: sql.raw(`now() + interval '${REFRESH_TOKEN_TTL_DAYS} days'`),
            revoked: false,
        });
    }

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
            .returning(UsersService.userFields);

        if (!newUser?.id) {
            throw { statusCode: 500, messageKey: "SOMETHING_WENT_WRONG" };
        }

        const refreshToken = generateRandomToken();
        const refreshTokenHash = hashToken(refreshToken);

        try {
            await this.createUserToken({
                userId: newUser.id,
                tokenHash: refreshTokenHash,
            });

            return { newUser, refreshToken };
        } catch (error) {
            await this.deleteUser(newUser.id);
            throw error;
        }
    }

    async deleteUser(id: User["id"]) {
        await db.delete(usersTable).where(eq(usersTable.id, id));
    }

    async updateUser(id: User["id"], data: UpdateUserDto): Promise<User | null> {
        if (!data || Object.keys(data).length === 0) return null;

        const [updated] = await db
            .update(usersTable)
            .set(data)
            .where(eq(usersTable.id, id))
            .returning(UsersService.userFields);

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
            .select(UsersService.userFields)
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
