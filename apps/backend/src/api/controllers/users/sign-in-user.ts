import { NextFunction, Response } from "express";

import { LoginUserDto } from "@repo/common/types/users";

import { userTokensService } from "@/db/services/user-tokens-service";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const signInUser = async (
    req: AppRequest<LoginUserDto>,
    res: Response,
    next: NextFunction,
) => {
    const user = await passportControllerWrapper("signin", { session: false })(req, res, next);

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userTokensService.createUserRefreshToken({
        userId: user.id,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);

    res.json({ accessToken });
};
