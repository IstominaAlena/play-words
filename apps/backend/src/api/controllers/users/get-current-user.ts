import { Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { usersService } from "@/db/services/users-service";
import { AppRequest } from "@/types/common";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const getCurrentUser = async (req: AppRequest, res: Response) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: messages.UNAUTHORIZED });
        }

        const safeUser = await usersService.getSafeUserById(userId);

        if (!safeUser) {
            return res.status(404).json({ message: messages.NOT_FOUND });
        }

        res.json({ user: safeUser });
    } catch (err: unknown) {
        const { status, message } = getErrorMessage(err, lang);

        return res.status(status).json({ message });
    }
};
