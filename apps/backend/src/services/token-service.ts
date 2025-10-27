import crypto from "crypto";
import { eq } from "drizzle-orm";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { db } from "@/config/drizzle-orm/db";
import {
    ACCESS_TOKEN_EXP,
    JWT_SECRET,
    REFRESH_TOKEN_TTL_DAYS,
    messageKeys,
} from "@/constants/common";
import { AuthUser } from "@/types/common";
import { ValidateTokenTableType } from "@/types/users";

import { AppError } from "./error-service";

export class TokenService {
    generateRandomToken() {
        return crypto.randomBytes(64).toString("hex");
    }

    hashToken(token: string) {
        return crypto.createHash("sha256").update(token).digest("hex");
    }

    generateAccessToken(id: string | number, email: string) {
        const jti = crypto.randomUUID(); // unique token identifier
        return jwt.sign({ id, email, jti }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });
    }

    verifyAccessToken(token: string = ""): AuthUser {
        if (!token) {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }

        try {
            const payload = jwt.verify(token, JWT_SECRET) as AuthUser;

            if (typeof payload !== "object" || !payload.id || !payload.email) {
                throw new AppError(401, messageKeys.UNAUTHORIZED);
            }

            return { id: payload.id, email: payload.email };
        } catch {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }
    }

    generateTokenPair() {
        const token = this.generateRandomToken();
        const tokenHash = this.hashToken(token);

        return { token, tokenHash };
    }

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

    setRefreshTokenCookie(res: Response, refreshToken: string, maxAge?: number) {
        // HttpOnly secure cookie for refresh token

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: maxAge ?? REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
            path: "/api/users/refresh",
        });
    }

    setAccessTokenCookie(res: Response, accessToken: string, maxAge?: number) {
        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: maxAge ?? 15 * 60 * 1000,
        });
    }

    setResetPasswordTokenCookie(res: Response, resetPasswordToken: string, maxAge?: number) {
        res.cookie("reset_password_token", resetPasswordToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: maxAge ?? 30 * 60 * 1000,
        });
    }
}

export const tokenService = new TokenService();
