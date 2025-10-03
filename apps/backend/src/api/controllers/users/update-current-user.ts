import { Response } from "express";

import { UpdateUserDto } from "@repo/common/types/users";

import { i18nService } from "@/config/i18n/service";
import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users-service";
import { passwordService } from "@/services/password-service";
import { AppRequest } from "@/types/common";
import { UpdateUser } from "@/types/users";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const updateCurrentUser = async (req: AppRequest<UpdateUserDto>, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    const userId = req.user?.id;

    if (!userId) {
        throw { statusCode: 401, messageKey: messageKeys.UNAUTHORIZED };
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
        throw { statusCode: 400, messageKey: messageKeys.BAD_REQUEST };
    }

    const safeUser = await usersService.updateUser(currentUser.id, updateData);

    res.json({ user: safeUser });
};
