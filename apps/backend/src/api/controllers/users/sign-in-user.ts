import { Response } from "express";

import { LoginUserDto } from "@repo/common/types/users";

import { i18nService } from "@/config/i18n/service";
import { userTokensService } from "@/db/services/user-tokens-service";
import { usersService } from "@/db/services/users-service";
import { AppRequest } from "@/types/common";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";
import { comparePassword } from "@/utils/password";
import { setRefreshTokenCookie } from "@/utils/refresh-token-cookies";
import { generateAccessToken, generateRandomToken, hashToken } from "@/utils/token";

export const signInUser = async (req: AppRequest<LoginUserDto>, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const { email: rawEmail, password } = req.body;

        const email = String(rawEmail).trim().toLowerCase();

        const user = await usersService.getUserByEmail(email);

        const isPasswordValid = user && (await comparePassword(password, user?.passwordHash));

        if (!user || !isPasswordValid) {
            return res.status(401).json({ message: messages.INVALID_CREDENTIALS });
        }

        const accessToken = generateAccessToken(user.id, user.email);

        const refreshToken = generateRandomToken();
        const refreshTokenHash = hashToken(refreshToken);

        await userTokensService.createUserToken({
            userId: user.id,
            tokenHash: refreshTokenHash,
        });

        // HttpOnly secure cookie for refresh token
        setRefreshTokenCookie(res, refreshToken);

        const safeUser = await usersService.getSafeUserById(user.id);

        res.json({ user: safeUser, accessToken });
    } catch (err: unknown) {
        const { status, message } = getErrorMessage(err, lang);

        return res.status(status).json({ message });
    }
};
