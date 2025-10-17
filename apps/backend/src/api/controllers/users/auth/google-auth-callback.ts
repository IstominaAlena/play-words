import { NextFunction, Response } from "express";

import { BASE_CLIENT_URL, messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const googleAuthCallback = async (req: AppRequest, res: Response, next: NextFunction) => {
    const { user, refreshToken } = await passportControllerWrapper("google-auth", {
        session: false,
    })(req, res, next);

    if (!user || !refreshToken) throw new AppError(401, messageKeys.UNAUTHORIZED);

    const credentials = await userCredentialsService.getCredentialsByUserId(user.id);

    if (!credentials) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    if (credentials.otpSecret) {
        return res.status(200).json({ otp: true, email: user.email });
    }

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    tokenService.setRefreshTokenCookie(res, refreshToken);
    tokenService.setAccessTokenCookie(res, accessToken);

    res.redirect(`${BASE_CLIENT_URL}/auth/success`);
};
