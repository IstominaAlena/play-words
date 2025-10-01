import { Request, Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const notFoundHandler = (req: Request, res: Response) => {
    const lang = getLanguageFromRequest(req);
    const messages = i18nService.getMessages(lang);
    const message = messages.NOT_FOUND;

    return res.status(404).json({ message });
};
