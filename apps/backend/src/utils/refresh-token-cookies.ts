import { Response } from "express";

import { REFRESH_TOKEN_TTL_DAYS } from "@/constants/common";

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
        path: "/api/users/refresh",
    });
};
