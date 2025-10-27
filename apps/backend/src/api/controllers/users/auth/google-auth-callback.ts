import { NextFunction, Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { BASE_CLIENT_URL, messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AppRequest, Messages } from "@/types/common";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const googleAuthCallback = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const { user, refreshToken } = await passportControllerWrapper("google-auth", {
            session: false,
        })(req, res, next);

        if (!user || !refreshToken) throw new AppError(401, messageKeys.UNAUTHORIZED);

        const credentials = await userCredentialsService.getCredentialsByUserId(user.id);

        if (!credentials) {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }

        if (credentials.otpSecret) {
            res.redirect(`${BASE_CLIENT_URL}?otp=true&email=${encodeURIComponent(user.email)}`);
        }

        const accessToken = tokenService.generateAccessToken(user.id, user.email);

        tokenService.setRefreshTokenCookie(res, refreshToken);
        tokenService.setAccessTokenCookie(res, accessToken);

        res.redirect(`${BASE_CLIENT_URL}/auth/success`);
    } catch (error: any) {
        const lang = getLanguageFromRequest(req);

        const messages = i18nService.getMessages(lang);

        const key = error.messageKey as keyof Messages;

        const errorMessage = encodeURIComponent(messages[key] || "Unknown Error");

        res.redirect(`${BASE_CLIENT_URL}?error=${errorMessage}`);
    }
};
