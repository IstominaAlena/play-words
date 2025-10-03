import { NextFunction, Request, Response } from "express";

import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const lang = getLanguageFromRequest(req);
    const { status, message } = getErrorMessage(err, lang);

    res.status(status).json({ message });
};
