import { NextFunction, Response } from "express";

import { i18nService } from "@/config/i18n/service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const authValidation = (req: AppRequest, res: Response, next: NextFunction) => {
    const lang = getLanguageFromRequest(req);

    const messages = i18nService.getMessages(lang);

    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: messages.UNAUTHORIZED });
        }

        const token = authHeader.split(" ")[1];

        const payload = tokenService.verifyAccessToken(token);

        req.user = {
            id: payload.id,
            email: payload.email,
        };

        next();
    } catch {
        return res.status(401).json({ message: messages.UNAUTHORIZED });
    }
};
