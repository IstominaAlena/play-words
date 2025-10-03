import { Response } from "express";

import { ResetUserPassword } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { userTokensService } from "@/db/services/user-tokens-service";
import { usersService } from "@/db/services/users-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import { AppRequest } from "@/types/common";

export const resetUserPassword = async (req: AppRequest<ResetUserPassword>, res: Response) => {
    const { token: rawResetPasswordToken, password: newPassword } = req.body;

    const tokenRecord = await userTokensService.validateResetPasswordToken(rawResetPasswordToken);

    if (!tokenRecord) {
        throw new AppError(400, messageKeys.INVALID_TOKEN);
    }

    const newPasswordHash = await passwordService.hashPassword(newPassword);

    await usersService.updateUser(tokenRecord.userId, { passwordHash: newPasswordHash });

    await userTokensService.deleteUserResetPasswordToken(tokenRecord.id);

    res.json({ success: true });
};
