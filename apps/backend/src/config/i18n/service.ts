import { DEFAULT_LOCALE, LOCALES } from "@repo/common/constants/common";
import { SupportedLanguages } from "@repo/common/enums/common";

import { getBackendMessages } from "./get-backend-messages";

export class I18nService {
    constructor(
        private defaultLocale: SupportedLanguages = DEFAULT_LOCALE,
        private supportedLocales: SupportedLanguages[] = LOCALES,
    ) {}

    getMessages(acceptLanguageHeader?: string) {
        const langHeader = (acceptLanguageHeader as SupportedLanguages) || this.defaultLocale;
        const lang = this.supportedLocales.includes(langHeader) ? langHeader : this.defaultLocale;
        return getBackendMessages(lang);
    }
}

export const i18nService = new I18nService();
