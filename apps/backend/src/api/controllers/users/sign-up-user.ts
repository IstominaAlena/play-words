import { Response } from "express";

import { CreateUserDto } from "@repo/common/types/users";

import { i18nService } from "@/config/i18n/service";
import { usersService } from "@/db/services/users-service";
import { AppRequest } from "@/types/common";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";
import { hashPassword } from "@/utils/password";
import { setRefreshTokenCookie } from "@/utils/refresh-token-coolies";
import { generateAccessToken } from "@/utils/token";

export const signUpUser = async (req: AppRequest<CreateUserDto>, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const { email: rawEmail, username: rawUsername, password } = req.body;

        const email = String(rawEmail).trim().toLowerCase();
        const username = rawUsername.trim();

        const existingUser = await usersService.getUserByEmail(email);

        if (existingUser?.id) {
            return res.status(409).json({ message: messages.ALREADY_EXISTS });
        }

        const passwordHash = await hashPassword(password);

        const { newUser, refreshToken } = await usersService.createUser({
            email,
            username,
            passwordHash,
        });

        const accessToken = generateAccessToken(newUser.id, newUser.email);

        // HttpOnly secure cookie for refresh token
        setRefreshTokenCookie(res, refreshToken);

        res.json({ user: newUser, accessToken });
    } catch (err: unknown) {
        const { status, message } = getErrorMessage(err, lang);

        return res.status(status).json({ message });
    }
};
