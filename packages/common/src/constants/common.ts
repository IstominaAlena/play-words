import { Accent, Mode, SupportedLanguages } from "../enums/common";

export const LOCALES = Object.values(SupportedLanguages);

export const DEFAULT_LOCALE = SupportedLanguages.EN;

export const ACCESS_TOKEN_KEY = "accessToken";

export const DELETE_USER_REMAINING_PERIOD = 30;

export const DEFAULT_ITEMS_PER_PAGE = 10;

export const DEFAULT_WORDS_PER_TRAINING = 10;

export const DEBOUNCE_DELAY = 500;

export const DEFAULT_THEME = `${Mode.DARK}-${Accent.GREEN}`;

export const themeVariants = Object.values(Mode).flatMap((mode) =>
    Object.values(Accent).map((accent) => `${mode}-${accent}`),
);
