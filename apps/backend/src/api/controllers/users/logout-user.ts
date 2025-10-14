import { Response } from "express";

import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const logoutUser = async (req: AppRequest, res: Response) => {
    const rawCookiesRefreshToken = req.cookies.refresh_token;

    if (rawCookiesRefreshToken) {
        const tokenRecord =
            await userRefreshTokenService.validateRefreshToken(rawCookiesRefreshToken);

        if (tokenRecord) {
            await userRefreshTokenService.deleteRefreshToken(tokenRecord.id);
        }
    }

    tokenService.setRefreshTokenCookie(res, "", 0);
    tokenService.setAccessTokenCookie(res, "", 0);

    res.status(204).end();
};
