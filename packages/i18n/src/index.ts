import en from "./messages/en.json";
import ua from "./messages/ua.json";

export enum SupportedLanguages {
    EN = "en",
    UA = "ua",
}

export const MESSAGES = { en, ua };

export const LOCALES = Object.values(SupportedLanguages);

export const DEFAULT_LOCALE = SupportedLanguages.EN;
