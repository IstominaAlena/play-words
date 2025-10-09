import { Response } from "express";

import { ResetUserPassword } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { userResetPasswordTokenService } from "@/db/services/user-reset-password-token-service";
import { usersService } from "@/db/services/users-service";
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

    const newPasswordHash = await passwordService.hashPassword(newPassword);

    await usersService.updateUser(tokenRecord.userId, { passwordHash: newPasswordHash });

    await userResetPasswordTokenService.deleteResetPasswordToken(tokenRecord.id);

    res.json({ success: true });
};
