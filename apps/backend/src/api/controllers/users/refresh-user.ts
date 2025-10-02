import { Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { userTokensService } from "@/db/services/user-tokens-service";
import { usersService } from "@/db/services/users-service";
import { AppRequest } from "@/types/common";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";
import { setRefreshTokenCookie } from "@/utils/refresh-token-cookies";
import { generateAccessToken, generateRandomToken, hashToken } from "@/utils/token";

export const refreshUser = async (req: AppRequest, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const rawCookiesRefreshToken = req.cookies.refresh_token;

        const tokenRecord = await userTokensService.validateRefreshToken(rawCookiesRefreshToken);

        if (!tokenRecord) {
            return res.status(401).json({ message: messages.INVALID_REFRESH_TOKEN });
        }

        const safeUser = await usersService.getSafeUserById(tokenRecord.userId);

        if (!safeUser) {
            return res.status(404).json({ message: messages.NOT_FOUND });
        }

        const accessToken = generateAccessToken(safeUser.id, safeUser.email);

        const refreshToken = generateRandomToken();
        const refreshTokenHash = hashToken(refreshToken);

        await userTokensService.createUserToken({
            userId: safeUser.id,
            tokenHash: refreshTokenHash,
        });

        // HttpOnly secure cookie for refresh token
        setRefreshTokenCookie(res, refreshToken);

        res.json({ user: safeUser, accessToken });
    } catch (err: unknown) {
        const { status, message } = getErrorMessage(err, lang);

        return res.status(status).json({ message });
    }
};
