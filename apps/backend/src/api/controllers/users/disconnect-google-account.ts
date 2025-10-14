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

    const localCredentials = await userCredentialsService.getCredentialsByUserIdAndProvider(
        userId,
        "local",
    );

    if (!localCredentials || !localCredentials.passwordHash) {
        throw new AppError(400, messageKeys.CREATE_PASSWORD_TO_DISCONNECT);
    }

    const googleCredentials = await userCredentialsService.getCredentialsByUserIdAndProvider(
        userId,
        "google",
    );

    if (!googleCredentials) {
        throw new AppError(409, messageKeys.GOOGLE_NOT_CONNECTED);
    }

    await userCredentialsService.deleteUsersCredentials(googleCredentials.id);

    const updatedSettings = await userSettingService.updateUserSettings(userId, {
        google: false,
    });

    if (!updatedSettings) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.json({ settings: updatedSettings });
};
