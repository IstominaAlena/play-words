import { NextFunction, Response } from "express";

import { CreateAccountDto } from "@repo/common/types/account";

import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const signUpUser = async (
    req: AppRequest<CreateAccountDto>,
    res: Response,
    next: NextFunction,
) => {
    const { user, refreshToken } = await passportControllerWrapper("local-signup", {
        session: false,
    })(req, res, next);

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    tokenService.setRefreshTokenCookie(res, refreshToken!);
    tokenService.setAccessTokenCookie(res, accessToken);

    res.status(201).end();
};
