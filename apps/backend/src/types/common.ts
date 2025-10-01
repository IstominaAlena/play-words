import defaultLang from "../messages/en.json";

export type AppError = Error & { statusCode?: number; messageKey?: string };

export type Messages = typeof defaultLang;
