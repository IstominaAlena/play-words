import { NextFunction, Response } from "express";

import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { tokenService } from "@/services/token-service";
import { AppRequest, LocalSigninDto } from "@/types/common";

export const signInUser = async (
    req: AppRequest<LocalSigninDto>,
    res: Response,
    next: NextFunction,
) => {
    const { user } = await passportControllerWrapper("local-signin", { session: false })(
        req,
        res,
        next,
    );

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userRefreshTokenService.createRefreshToken({
        userId: user.id,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);

    res.json({ accessToken });
};
