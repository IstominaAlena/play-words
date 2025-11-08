import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { cn } from "@repo/ui/class-names";
import { LoaderScreen } from "@repo/ui/components/loader-screen";
import { balsamiqSans } from "@repo/ui/fonts";
import "@repo/ui/styles";
import { AppThemeProvider } from "@repo/ui/theme/theme-provider";

import { QueryProvider } from "@repo/api-config/api-config";
import { routing } from "@repo/i18n/config/routing";

import { MainLayout } from "@/components/layout/main-layout";
import { SchemaMarkup } from "@/components/layout/schema-murkup";

export const metadata: Metadata = {
    title: {
        default: "Play Words",
        template: "%s - Play Words",
    },
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

    const messages = await getMessages({ locale });

    return (
        <html
            lang={locale}
            className={cn("h-screen overflow-hidden scroll-smooth", balsamiqSans.variable)}
            suppressHydrationWarning
        >
            <head>
                <SchemaMarkup />
            </head>
            <body className="bg-primary_bg w-ful no-scrollbar flex h-[100dvh] flex-col overflow-y-auto">
                <AppThemeProvider>
                    <QueryProvider>
                        <NextIntlClientProvider locale={locale} messages={messages}>
                            <Suspense fallback={<LoaderScreen />}>
                                <MainLayout>{children}</MainLayout>
                            </Suspense>
                        </NextIntlClientProvider>
                    </QueryProvider>
                </AppThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;
