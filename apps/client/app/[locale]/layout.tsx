import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Loader } from "@repo/ui/core/loader";
import "@repo/ui/styles";

import { QueryProvider } from "@repo/api-config/api-config";
import { routing } from "@repo/i18n/config/routing";

import { MainLayout } from "@/components/layout/main-layout";

export const metadata: Metadata = {
    title: "Play Words",
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
        <html lang={locale} className="scroll-smooth">
            <body className="bg-primary_dark w-ful flex h-[100dvh] flex-col">
                <QueryProvider>
                    <NextIntlClientProvider>
                        <Suspense fallback={<Loader />}>
                            <MainLayout>{children}</MainLayout>
                        </Suspense>
                    </NextIntlClientProvider>
                </QueryProvider>
            </body>
        </html>
    );
};

export default RootLayout;
