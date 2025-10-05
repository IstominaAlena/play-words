"use client";

import { useTranslations } from "next-intl";
import { FC, PropsWithChildren, useCallback, useMemo } from "react";

import { NavLink } from "@repo/common/types/common";
import { Link, usePathname } from "@repo/i18n/config/navigation";

import { DropdownMenu } from "../core/dropdown-menu";
import { MenuIcon } from "../icons/menu";
import { cn } from "../utils/class-names";

interface Props extends PropsWithChildren {
    links: NavLink[];
    className?: string;
}

export const MobileMenu: FC<Props> = ({ children, links, className }) => {
    const t = useTranslations("navigation");
    const currentPath = usePathname();

    const trigger = useMemo(
        () => (
            <div>
                <MenuIcon width={28} height={28} />
            </div>
        ),
        [],
    );

    const renderLinkItem = useCallback(
        ({ path, key, icon: Icon }: NavLink) => (
            <Link
                key={key}
                href={path}
                className={cn(
                    "text-secondary_light hover:text-accent_dark flex items-center gap-2 px-4 py-2",
                    currentPath === path && "text-accent_light",
                )}
            >
                <Icon className="text-inherit" width={16} height={16} />
                {t(key)}
            </Link>
        ),
        [currentPath, t],
    );

    const content = useMemo(() => links.map(renderLinkItem), [links, renderLinkItem]);

    return (
        <DropdownMenu
            trigger={trigger}
            triggerClassName={cn(
                "border border-transparent rounded-full p-1 data-[state=open]:border-accent_light transition-all duration-300",
                className,
            )}
            content={content}
            contentClassName={className}
        >
            {children}
        </DropdownMenu>
    );
};
