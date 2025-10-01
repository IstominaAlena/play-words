import { Request, Response } from "express";

import { AppError } from "@/types/common";
import { getErrorMessage } from "@/utils/get-error-message";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const errorHandler = (err: AppError, req: Request, res: Response) => {
    const lang = getLanguageFromRequest(req);
    const { status, message } = getErrorMessage(err, lang);

    res.status(status).json({ message });
};
