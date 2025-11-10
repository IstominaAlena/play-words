/* eslint-disable no-undef */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    productionBrowserSourceMaps: true,
    output: "standalone",
    experimental: {
        modern: true,
        legacyBrowsers: false,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
};

export default withNextIntl(nextConfig);
