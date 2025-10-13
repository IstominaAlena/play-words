import { NextFunction, Response } from "express";

import { messageKeys } from "@/constants/common";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const googleAuthCallback = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const { user, refreshToken } = await passportControllerWrapper("google-auth", {
            session: false,
        })(req, res, next);

        if (!user || !refreshToken) throw new AppError(401, messageKeys.UNAUTHORIZED);

        const accessToken = tokenService.generateAccessToken(user.id, user.email);
        tokenService.setRefreshTokenCookie(res, refreshToken);

        res.status(200).json({ accessToken, user });
    } catch (err) {
        next(err);
    }
};
