import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { LoaderScreen } from "@repo/ui/components/loader-screen";
import { Toaster } from "@repo/ui/core/sonner";
import "@repo/ui/styles";

import { QueryProvider } from "@repo/api-config/api-config";
import { routing } from "@repo/i18n/config/routing";

import { AppInitializer } from "@/components/auth/auth-initializer";
import { MainLayout } from "@/components/layout/main-layout";

export const metadata: Metadata = {
    title: {
        default: "Play Words",
        template: "%s - Play Words",
    },
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

    const messages = await getMessages({ locale });

    return (
        <html lang={locale} className="h-screen overflow-hidden scroll-smooth">
            <body className="bg-primary_bg w-ful scrollbar flex h-[100dvh] flex-col overflow-y-auto">
                <QueryProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        <Suspense fallback={<LoaderScreen />}>
                            <AppInitializer />
                            <MainLayout>{children}</MainLayout>
                            <Toaster />
                        </Suspense>
                    </NextIntlClientProvider>
                </QueryProvider>
            </body>
        </html>
    );
};

export default RootLayout;
