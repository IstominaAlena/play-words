import crypto from "crypto";
import { Response } from "express";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_EXP, JWT_SECRET, REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";

export class TokenService {
    readonly ACCESS_TOKEN_EXP: string;
    readonly JWT_SECRET: string;
    readonly REFRESH_TOKEN_TTL_DAYS: number;

    constructor() {
        this.ACCESS_TOKEN_EXP = ACCESS_TOKEN_EXP;
        this.JWT_SECRET = JWT_SECRET;
        this.REFRESH_TOKEN_TTL_DAYS = REFRESH_TOKEN_TTL_DAYS;
    }

    private generateRandomToken() {
        return crypto.randomBytes(64).toString("hex");
    }

    hashToken(token: string) {
        return crypto.createHash("sha256").update(token).digest("hex");
    }

    generateAccessToken(id: string | number, email: string) {
        const jti = crypto.randomUUID(); // unique token identifier
        return jwt.sign({ sub: id, email, jti }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });
    }

    verifyAccessToken(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }

    generateRefreshTokenPair() {
        const refreshToken = this.generateRandomToken();
        const refreshTokenHash = this.hashToken(refreshToken);

        return { refreshToken, refreshTokenHash };
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
