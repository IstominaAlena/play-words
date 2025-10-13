import { i18nService } from "@/config/i18n/service";
import { AppError } from "@/types/common";

export const getErrorMessage = (err: unknown, lang: string = "") => {
    const messages = i18nService.getMessages(lang);
    const error = err as AppError;
    const status = error.statusCode || 500;
    const message =
        error.messageKey && messages[error.messageKey]
            ? messages[error.messageKey]
            : error.message || messages.INTERNAL_SERVER_ERROR;
    return { status, message };
};
