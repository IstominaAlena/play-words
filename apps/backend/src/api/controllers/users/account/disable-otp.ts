import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { userSettingsService } from "@/db/services/users/user-settings-service";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AuthenticatedRequest } from "@/types/common";

export const disableOtp = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const credentialsId = await userCredentialsService.updateUserCredentials(userId, {
        otpSecret: null,
    });

    if (!credentialsId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const settings = await userSettingsService.updateUserSettings(userId, { otp: false });

    if (!settings) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userRefreshTokenService.createRefreshToken({
        userId,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);

    return res.status(204).end();
};
