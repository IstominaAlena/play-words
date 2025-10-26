import { NextFunction, Response } from "express";

import { LoginDto } from "@repo/common/types/account";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const signInUser = async (req: AppRequest<LoginDto>, res: Response, next: NextFunction) => {
    const { user } = await passportControllerWrapper("local-signin", { session: false })(
        req,
        res,
        next,
    );

    const credentials = await userCredentialsService.getCredentialsByUserId(user.id);

    if (!credentials) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    if (credentials.otpSecret) {
        return res.status(200).json({ otp: true, email: user.email });
    }

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userRefreshTokenService.createRefreshToken({
        userId: user.id,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);
    tokenService.setAccessTokenCookie(res, accessToken);

    res.status(200).json({ otp: false });
};
