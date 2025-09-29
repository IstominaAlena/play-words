import { defineRouting } from "next-intl/routing";

import { DEFAULT_LOCALE, LOCALES } from "@repo/common/constants/common";

export const routing = defineRouting({
    locales: LOCALES,
    defaultLocale: DEFAULT_LOCALE,
});
