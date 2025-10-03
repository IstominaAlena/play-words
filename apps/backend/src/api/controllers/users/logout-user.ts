import { Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { userTokensService } from "@/db/services/user-tokens-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const logoutUser = async (req: AppRequest, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    const rawCookiesRefreshToken = req.cookies.refresh_token;

    if (rawCookiesRefreshToken) {
        const tokenRecord = await userTokensService.validateRefreshToken(rawCookiesRefreshToken);

        if (tokenRecord) {
            await userTokensService.deleteUserRefreshToken(tokenRecord.id);
        }
    }

    tokenService.setRefreshTokenCookie(res, "");

    res.json({ message: messages.LOGOUT_SUCCESS });
};
