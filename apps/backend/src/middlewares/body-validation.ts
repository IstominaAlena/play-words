import { NextFunction, Response } from "express";
import { ZodError, ZodType } from "zod";

import { i18nService } from "@/config/i18n/service";
import { AppRequest, Messages } from "@/types/common";
import { getLanguageFromRequest } from "@/utils/get-language-from-request";

export const validateBody = <T>(schema: ZodType<T>) => {
    return (req: AppRequest<T>, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            const lang = getLanguageFromRequest(req);
            const messages = i18nService.getMessages(lang);

            let fields: Record<string, string> = {};

            if (err instanceof ZodError) {
                fields = err.issues.reduce(
                    (acc, issue) => {
                        const key = issue.path.join(".");
                        const messageKey = issue.message as keyof Messages;

                        if (key) acc[key] = messages[messageKey];
                        return acc;
                    },
                    {} as Record<string, string>,
                );
            }

            return res.status(400).json({
                message: messages.VALIDATION_FAILED,
                fields,
            });
        }
    };
};
