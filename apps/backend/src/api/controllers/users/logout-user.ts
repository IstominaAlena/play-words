import { Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { userTokensService } from "@/db/services/user-tokens-service";
import { AppRequest } from "@/types/common";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";
import { setRefreshTokenCookie } from "@/utils/refresh-token-cookies";

export const logoutUser = async (req: AppRequest, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const rawCookiesRefreshToken = req.cookies.refresh_token;

        if (rawCookiesRefreshToken) {
            const tokenRecord =
                await userTokensService.validateRefreshToken(rawCookiesRefreshToken);

            if (tokenRecord) {
                await userTokensService.deleteUserToken(tokenRecord.id);
            }
        }

        setRefreshTokenCookie(res, "");

        res.json({ message: messages.LOGOUT_SUCCESS });
    } catch (err: unknown) {
        const { status, message } = getErrorMessage(err, lang);

        return res.status(status).json({ message });
    }
};
