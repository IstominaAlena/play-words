import { NextFunction, Request, Response } from "express";

import { DEFAULT_LOCALE, LOCALES } from "@repo/common/constants/common";
import { SupportedLanguages } from "@repo/common/enums/common";

import { getBackendMessages } from "./get-backend-messages";

export function i18nMiddleware(req: Request, _res: Response, next: NextFunction) {
    const langHeader =
        (req.headers["accept-language"]?.toString() as SupportedLanguages) || DEFAULT_LOCALE;
    const lang = LOCALES.includes(langHeader) ? langHeader : DEFAULT_LOCALE;

    req.messages = getBackendMessages(lang);
    next();
}
