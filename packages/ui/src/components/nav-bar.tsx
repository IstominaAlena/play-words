"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { NavLink } from "@repo/common/types/common";
import { Link, usePathname } from "@repo/i18n/config/navigation";

import { cn } from "../utils/class-names";

interface Props {
    links: NavLink[];
    className?: string;
    linkClassName?: string;
}

export const NavBar: FC<Props> = ({ links, className, linkClassName }) => {
    const t = useTranslations("navigation");

    const currentPath = usePathname();

    const renderLinkItem = ({ key, path, icon: Icon }: NavLink) => (
        <li key={key}>
            <Link
                href={path}
                className={cn(
                    "hover:text-accent_dark flex h-full items-center gap-2 px-4 transition-all duration-300 lg:px-2",
                    currentPath === path && "text-accent_light",
                    linkClassName,
                )}
            >
                <Icon className="text-inherit" width={16} height={16} />
                {t(key)}
            </Link>
        </li>
    );

    return (
        <ul className={cn("text-secondary_light flex h-full text-base font-medium", className)}>
            {links.map(renderLinkItem)}
        </ul>
    );
};
