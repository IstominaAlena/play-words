import { NextFunction, Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { BASE_CLIENT_URL, messageKeys } from "@/constants/common";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { AppRequest, Messages } from "@/types/common";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const googleConnectCallback = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }

        req.headers.authorization = `Bearer ${token}`;

        const user = await passportControllerWrapper("jwt", { session: false })(req, res, next);

        if (!user) {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }

        req.user = user;

        const result = await passportControllerWrapper("connect-google", { session: false })(
            req,
            res,
            next,
        );

        if (!result || !result.settings) {
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        res.redirect(`${BASE_CLIENT_URL}/auth/success`);
    } catch (error: unknown) {
        const lang = getLanguageFromRequest(req);

        const messages = i18nService.getMessages(lang);

        if (error instanceof AppError) {
            const key = error.messageKey as keyof Messages;

            const errorMessage = encodeURIComponent(messages[key] || "Unknown Error");

            res.redirect(`${BASE_CLIENT_URL}?error=${errorMessage}`);
        }
    }
};
