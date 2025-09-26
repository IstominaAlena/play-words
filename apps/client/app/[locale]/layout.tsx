import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

import "@repo/ui/styles";

import { routing } from "@repo/i18n/config/routing";

export const metadata: Metadata = {
    title: "CLIENT",
    description: "",
};

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

const RootLayout = async ({ children, params }: Props) => {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider>
                    <header></header>
                    <main>{children}</main>
                    <footer></footer>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export default RootLayout;
