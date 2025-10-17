import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userSettingService } from "@/db/services/users/user-settings-service";
import { AppError } from "@/services/error-service";
import { otpService } from "@/services/otp-service";
import { AuthenticatedRequest } from "@/types/common";

export const enableOtp = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const secret = await otpService.generateSecret(userId);

    if (!secret.otpauth_url || !secret.base32) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const credentialsId = await userCredentialsService.updateUserCredentials(userId, {
        otpSecret: secret.base32,
    });

    if (!credentialsId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const settings = await userSettingService.updateUserSettings(userId, { otp: true });

    if (!settings) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    return res.status(200).json({ otpAuthUrl: secret.otpauth_url, settings });
};
