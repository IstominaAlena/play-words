import { Request, Response } from "express";

import { getUserByEmail } from "@/db/queries/read/users";
import { usersService } from "@/db/services/users-service";
import { AppError } from "@/types/common";
import { hashPassword } from "@/utils/password";
import { setRefreshTokenCookie } from "@/utils/refresh-token-coolies";
import { generateAccessToken } from "@/utils/token";

export const signUpUser = async (req: Request, res: Response) => {
    const messages = req.messages;

    try {
        const { email: rawEmail, username: rawUsername, password } = req.body;

        if (!rawEmail || !password || !rawUsername) {
            return res.status(400).json({ message: messages.BAD_REQUEST || "Missing fields" });
        }

        const email = String(rawEmail).trim().toLowerCase();
        const username = rawUsername.trim();

        const existingUser = (await getUserByEmail(email))[0];

        if (existingUser?.id) {
            return res.status(409).json({ message: messages.ALREADY_EXISTS || "Already exists" });
        }

        const passwordHash = await hashPassword(password);

        const { newUser, refreshToken } = await usersService.createUser({
            email,
            username,
            passwordHash,
        });

        const accessToken = generateAccessToken(newUser.id, newUser.email);

        // HttpOnly secure cookie for refresh token
        setRefreshTokenCookie(res, refreshToken);

        res.json({ user: newUser, accessToken });
    } catch (err: unknown) {
        const error = err as AppError;
        const status = error.statusCode || 500;
        const message = error.messageKey ? messages[error.messageKey] : error.message;

        return res.status(status).json({ message });
    }
};
