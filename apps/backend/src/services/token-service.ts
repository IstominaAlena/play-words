import crypto from "crypto";
import { Response } from "express";
import jwt from "jsonwebtoken";

import {
    ACCESS_TOKEN_EXP,
    JWT_SECRET,
    REFRESH_TOKEN_TTL_DAYS,
    messageKeys,
} from "@/constants/common";
import { AuthUser } from "@/types/common";

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
            throw { statusCode: 401, messageKey: messageKeys.UNAUTHORIZED };
        }

        try {
            const payload = jwt.verify(token, JWT_SECRET) as AuthUser;

            if (typeof payload !== "object" || !payload.id || !payload.email) {
                throw { statusCode: 401, messageKey: messageKeys.UNAUTHORIZED };
            }

            return { id: payload.id, email: payload.email };
        } catch {
            throw { statusCode: 401, messageKey: messageKeys.UNAUTHORIZED };
        }
    }

    generateTokenPair() {
        const token = this.generateRandomToken();
        const tokenHash = this.hashToken(token);

        return { token, tokenHash };
    }

    setRefreshTokenCookie(res: Response, refreshToken: string) {
        // HttpOnly secure cookie for refresh token

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
            path: "/api/users/refresh",
        });
    }
}

export const tokenService = new TokenService();
