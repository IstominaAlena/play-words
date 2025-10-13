import { Response } from "express";

import { ResetUserPassword } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-table";
import { userResetPasswordTokenService } from "@/db/services/users/user-reset-password-token-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import { AppRequest } from "@/types/common";

export const resetUserPassword = async (req: AppRequest<ResetUserPassword>, res: Response) => {
    const { token: rawResetPasswordToken, password: newPassword } = req.body;

    const tokenRecord =
        await userResetPasswordTokenService.validateResetPasswordToken(rawResetPasswordToken);

    if (!tokenRecord) {
        throw new AppError(400, messageKeys.INVALID_TOKEN);
    }

    await userResetPasswordTokenService.deleteResetPasswordToken(tokenRecord.id);

    const passwordHash = await passwordService.hashPassword(newPassword);

    await userCredentialsService.updateUserCredentials(tokenRecord.userId, { passwordHash });

    res.json({ success: true });
};
