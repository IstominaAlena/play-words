"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { GlowingContainer } from "@repo/ui/core/glowing-container";

import { Link, usePathname } from "@repo/i18n/config/navigation";

import { AccountRoutes } from "@/enums/routes";

const nav = [
    AccountRoutes.ACCOUNT,
    AccountRoutes.SECURITY,
    AccountRoutes.SETTINGS,
    AccountRoutes.STATISTICS,
];

export const AccountNav: FC = () => {
    const t = useTranslations("navigation");

    const currentPath = usePathname();

    const renderLinkItem = (item: string) => {
        const isActive = currentPath === item;

        const label =
            item === AccountRoutes.ACCOUNT ? "account" : item.replace(AccountRoutes.ACCOUNT, "");
        return (
            <li key={item} className="w-full">
                <Link
                    href={item}
                    className="group w-full"
                    data-state={isActive ? "active" : "inactive"}
                >
                    <GlowingContainer
                        containerClassName="rounded-lg"
                        contentClassName="text-secondary_text capitalize text-center md:px-2"
                        variant={isActive ? "SUCCESS" : "NEUTRAL"}
                    >
                        {t(label)}
                    </GlowingContainer>
                </Link>
            </li>
        );
    };

    return (
        <ul className="max-w-default flex h-fit w-full flex-col items-center justify-center gap-4 md:max-w-full md:flex-row md:gap-1">
            {nav.map(renderLinkItem)}
        </ul>
    );
};
