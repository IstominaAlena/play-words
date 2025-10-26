import { Response } from "express";

import { ResetPasswordRequest } from "@repo/common/types/account";

import { i18nService } from "@/config/i18n/service";
import { messageKeys } from "@/constants/common";
import { userResetPasswordTokenService } from "@/db/services/users/user-reset-password-token-service";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const resetUserPasswordRequest = async (
    req: AppRequest<ResetPasswordRequest>,
    res: Response,
) => {
    const lang = getLanguageFromRequest(req);
    const messages = i18nService.getMessages(lang);

    const { email: rawEmail } = req.body;

    if (!rawEmail) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const email = rawEmail.trim().toLowerCase();

    const user = await usersService.getUserByEmail(email);

    if (!user) {
        return res.status(200).json({ message: messages.RESET_LINK_SENT });
    }

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userResetPasswordTokenService.createResetPasswordToken({
        userId: user.id,
        tokenHash,
    });

    tokenService.setResetPasswordTokenCookie(res, token);

    return res.status(200).json({ success: true });
};
