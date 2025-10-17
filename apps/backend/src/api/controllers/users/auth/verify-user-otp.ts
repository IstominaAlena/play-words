import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { otpService } from "@/services/otp-service";
import { tokenService } from "@/services/token-service";
import { AppRequest, VerifyOtpDto } from "@/types/common";

export const verifyUserOtp = async (req: AppRequest<VerifyOtpDto>, res: Response) => {
    const { email, code } = req.body;

    const user = await usersService.getUserByEmail(email);

    if (!user) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const credentials = await userCredentialsService.getCredentialsByUserId(user.id);

    if (!credentials?.otpSecret) {
        throw new AppError(400, messageKeys.OTP_NOT_ENABLED);
    }

    const isOtpValid = await otpService.verifyOtp(credentials.otpSecret, code);

    if (!isOtpValid) {
        throw new AppError(400, messageKeys.INVALID_OTP);
    }

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userRefreshTokenService.createRefreshToken({
        userId: user.id,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);
    tokenService.setAccessTokenCookie(res, accessToken);

    res.status(204).end();
};
