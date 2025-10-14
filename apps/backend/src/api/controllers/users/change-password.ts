import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userSettingService } from "@/db/services/users/user-settings-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import { AuthenticatedRequest, ChangePassword } from "@/types/common";

export const changePassword = async (req: AuthenticatedRequest<ChangePassword>, res: Response) => {
    const { password: newPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const passwordHash = await passwordService.hashPassword(newPassword);

    const credentialsId = await userCredentialsService.updateUserCredentials(userId, {
        passwordHash,
    });

    if (!credentialsId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const settingsId = await userSettingService.updateUserSettings(userId, {
        password: !!credentialsId,
    });

    if (!settingsId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.json({ success: true });
};
