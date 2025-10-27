import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userResetPasswordTokenService } from "@/db/services/users/user-reset-password-token-service";
import { AppError } from "@/services/error-service";
import { hashService } from "@/services/hash-service";
import { tokenService } from "@/services/token-service";
import { AppRequest, ResetPassword } from "@/types/common";

export const resetUserPassword = async (req: AppRequest<ResetPassword>, res: Response) => {
    const { password: newPassword } = req.body;

    const { reset_password_token } = req.cookies;

    const tokenRecord =
        await userResetPasswordTokenService.validateResetPasswordToken(reset_password_token);

    if (!tokenRecord) {
        throw new AppError(400, messageKeys.INVALID_TOKEN);
    }

    await userResetPasswordTokenService.deleteResetPasswordToken(tokenRecord.id);

    const passwordHash = await hashService.hash(newPassword);

    await userCredentialsService.updateUserCredentials(tokenRecord.userId, { passwordHash });

    tokenService.setResetPasswordTokenCookie(res, "", 0);

    res.status(204).end();
};
