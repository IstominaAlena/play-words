import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userSettingService } from "@/db/services/users/user-settings-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const disconnectGoogleAccount = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const credentials = await userCredentialsService.getCredentialsByUserId(userId);

    if (!credentials) {
        throw new AppError(404, messageKeys.CREDENTIALS_NOT_FOUND);
    }

    if (!credentials.googleProviderId) {
        throw new AppError(400, messageKeys.GOOGLE_NOT_CONNECTED);
    }

    if (!credentials.passwordHash) {
        throw new AppError(400, messageKeys.CREATE_PASSWORD_TO_DISCONNECT);
    }

    const credentialsId = await userCredentialsService.updateUserCredentials(userId, {
        googleProviderId: null,
    });

    if (!credentialsId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const updatedSettings = await userSettingService.updateUserSettings(userId, {
        google: false,
    });

    if (!updatedSettings) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.json({ settings: updatedSettings });
};
