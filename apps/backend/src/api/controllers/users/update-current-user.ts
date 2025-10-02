import { Response } from "express";

import { UpdateUserDto } from "@repo/common/types/users";

import { i18nService } from "@/config/i18n/service";
import { usersService } from "@/db/services/users-service";
import { passwordService } from "@/services/password-service";
import { AppRequest } from "@/types/common";
import { UpdateUser } from "@/types/users";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const updateCurrentUser = async (req: AppRequest<UpdateUserDto>, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: messages.UNAUTHORIZED });
        }

        const currentUser = await usersService.getSafeUserById(userId);

        if (!currentUser) {
            return res.status(404).json({ message: messages.NOT_FOUND });
        }

        const { email: rawEmail, username: rawUsername, password } = req.body;

        const updateData: UpdateUser = {};

        if (rawEmail) updateData.email = rawEmail.trim().toLowerCase();
        if (rawUsername) updateData.username = rawUsername.trim();
        if (password) updateData.passwordHash = await passwordService.hashPassword(password);

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: messages.BAD_REQUEST });
        }

        const safeUser = await usersService.updateUser(currentUser.id, updateData);

        res.json({ user: safeUser });
    } catch (err: unknown) {
        const { status, message } = getErrorMessage(err, lang);

        return res.status(status).json({ message });
    }
};
