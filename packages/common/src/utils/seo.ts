import { getLocale, getTranslations } from "next-intl/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

export const getCanonicalUrl = (path: string = "", locale?: string) => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const localePrefix = locale ? `/${locale}` : "";

    return `${BASE_URL}${localePrefix}${normalizedPath === "/" ? "" : normalizedPath}`;
};

export const createMeta = async (page: string, path: string) => {
    const t = await getTranslations("meta");

    const locale = await getLocale();

    return {
        title: t(`${page}_title`),
        description: t(`${page}_description`),
        alternates: {
            canonical: getCanonicalUrl("/", locale),
        },
        openGraph: {
            title: t(`${page}_title`),
            description: t(`${page}_description`),
            url: getCanonicalUrl(path, locale),
            siteName: "PlayWords",
            images: [
                {
                    url: `${BASE_URL}/images/logo.png`,
                    width: 512,
                    height: 116,
                    alt: "Play Words logo",
                },
            ],
            locale,
            type: "website",
        },
    };
};
