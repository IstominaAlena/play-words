import { NextFunction, Response } from "express";

import { CreateUserDto } from "@repo/common/types/users";

import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const signUpUser = async (
    req: AppRequest<CreateUserDto>,
    res: Response,
    next: NextFunction,
) => {
    const { newUser, refreshToken } = await passportControllerWrapper("signup", { session: false })(
        req,
        res,
        next,
    );

    const accessToken = tokenService.generateAccessToken(newUser.id, newUser.email);

    tokenService.setRefreshTokenCookie(res, refreshToken);

    res.status(201).json({ accessToken });
};
