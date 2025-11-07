"use client";

import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { LoaderScreen } from "@repo/ui/components/loader-screen";
import { GradientLine } from "@repo/ui/core/gradient-line";

import { SupportedLanguages } from "@repo/common/enums/common";
import { useLoaderStore } from "@repo/common/stores/loader-store";
import { usePathname, useRouter } from "@repo/i18n/config/navigation";
import { routing } from "@repo/i18n/config/routing";

export const Footer: FC = () => {
    const router = useRouter();

    const pathname = usePathname();
    const params = useSearchParams();

    const locale = useLocale();

    const { isPending } = useLoaderStore();

    const onLocaleChange = (lang: SupportedLanguages) => () => {
        const query = Object.fromEntries(params.entries());
        router.replace({ pathname, query }, { locale: lang });
    };

    const renderLocaleItem = (lang: SupportedLanguages) => (
        <li
            key={lang}
            onClick={onLocaleChange(lang)}
            className={cn(
                "text-secondary_text hover:text-accent_dark cursor-pointer text-sm uppercase",
                locale === lang && "text-accent_light",
            )}
        >
            {lang}
        </li>
    );

    return (
        <footer className="relative flex h-16 w-full items-center justify-center text-white">
            <div className="relative h-fit w-fit px-4">
                <div className="bg-accent_dark absolute top-0 left-1/2 h-full w-px -translate-x-1/2"></div>
                <ul className="flex gap-6">{routing.locales.map(renderLocaleItem)}</ul>
            </div>
            <GradientLine className="absolute top-0 left-0" />
            {isPending && <LoaderScreen screenProtector />}
        </footer>
    );
};
