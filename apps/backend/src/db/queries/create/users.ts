import { sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";
import { userTokensTable, usersTable } from "@/db/schemas/users";
import { CreateUser, CreateUserToken } from "@/types/users";
import { generateRandomToken, hashToken } from "@/utils/token";

import { deleteUser } from "../delete/users";

export const createUserToken = async (rawData: CreateUserToken) => {
    const data = {
        ...rawData,
        expiresAt: sql.raw(`now() + interval '${REFRESH_TOKEN_TTL_DAYS} days'`),
        revoked: false,
    };
    await db.insert(userTokensTable).values(data);
};

export const createUser = async (data: CreateUser) => {
    const [newUser] = await db.insert(usersTable).values(data).returning({
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
    });

    if (!newUser?.id) {
        throw { statusCode: 500, messageKey: "SOMETHING_WENT_WRONG" };
    }

    const refreshToken = generateRandomToken();
    const refreshTokenHash = hashToken(refreshToken);

    try {
        await createUserToken({
            userId: newUser.id,
            tokenHash: refreshTokenHash,
        });

        return { newUser, refreshToken };
    } catch (error) {
        await deleteUser(newUser.id);
        throw error;
    }
};
