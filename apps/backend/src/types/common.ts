import defaultLang from "../messages/en.json";

export type AppError = Error & { status?: number; messageKey?: string };

export type Messages = typeof defaultLang;
