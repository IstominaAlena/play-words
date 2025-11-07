"use client";

import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { GlowingContainer } from "@repo/ui/core/glowing-container";

import { Link, usePathname } from "@repo/i18n/config/navigation";

import { SecondaryRoutes } from "@/enums/routes";

const nav = ["account", "security", "settings", "statistics"];

export const AccountNav: FC = () => {
    const currentPath = usePathname();

    const renderLinkItem = (item: string) => {
        const href = `${SecondaryRoutes.ACCOUNT}${item === "account" ? "" : `/${item}`}`;

        const isActive =
            item === "account"
                ? currentPath === href
                : currentPath === href || currentPath.startsWith(`${href}/`);

        return (
            <li key={item} className="w-full">
                <Link
                    href={href}
                    className="group w-full"
                    data-state={isActive ? "active" : "inactive"}
                >
                    <GlowingContainer
                        containerClassName="rounded-lg"
                        glowClassName={cn(isActive && "bg-accent_dark")}
                        contentClassName={cn(
                            "text-secondary_text capitalize text-center md:px-2",
                            isActive && "text-accent_dark",
                        )}
                    >
                        {item}
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
