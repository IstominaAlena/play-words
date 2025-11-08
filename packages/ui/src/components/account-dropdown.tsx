"use client";

import { useTranslations } from "next-intl";
import { FC, SVGProps, useMemo } from "react";

import { Link } from "@repo/i18n/config/navigation";

import { DropdownMenu } from "../core/dropdown-menu";
import { HoverBorderGradient } from "../core/hover-border-gradient";
import { Text } from "../core/typography";
import { AccountIcon } from "../icons/account";
import { LogoutIcon } from "../icons/logout";
import { cn } from "../utils/class-names";

interface Link {
    text: string;
    icon: FC<SVGProps<SVGSVGElement>>;
    path: string;
}

interface Props {
    name: string;
    links: Link[];
    onLogout: () => void;
    className?: string;
}

export const AccountDropdown: FC<Props> = ({ name, links, onLogout, className }) => {
    const t = useTranslations("auth");
    const tNav = useTranslations("navigation");
    const tAria = useTranslations("aria");

    const trigger = useMemo(
        () => (
            <HoverBorderGradient
                containerClassName="max-w-default w-full md:max-w-10"
                className="text-secondary_text group-hover:text-primary_text flex items-center gap-2"
                variant="SUCCESS"
            >
                <AccountIcon width={16} height={16} className="text-inherit" />
                <Text className="text-inherit md:hidden">{name}</Text>
            </HoverBorderGradient>
        ),
        [name],
    );

    const logoutButton = (
        <div onClick={onLogout} className="group">
            <div className="bg-horizontal_neutral_gradient h-px w-full" />
            <div className="text-secondary_text group-hover:text-error_dark flex cursor-pointer items-center gap-2 px-4 py-2 transition-all duration-300">
                <LogoutIcon className="text-inherit" width={16} height={16} />
                <Text className="text-inherit">{t("logout")}</Text>
            </div>
        </div>
    );

    const renderLinkItem = ({ path, text, icon: Icon }: Link, i: number) => (
        <Link
            key={i}
            href={path}
            className={cn(
                "text-secondary_text group hover:text-accent_dark flex items-center gap-2 px-4 py-2 transition-all duration-300",
            )}
        >
            <Icon className="text-inherit" width={16} height={16} />
            <Text className="text-inherit">{tNav(text)}</Text>
        </Link>
    );

    const accountLinks = links.map(renderLinkItem);

    const content = [...accountLinks, logoutButton];

    return (
        <DropdownMenu
            trigger={trigger}
            triggerClassName={cn("rounded-full p-1 transition-all duration-300", className)}
            content={content}
            contentClassName={className}
            ariaLabel={tAria("account_menu")}
        />
    );
};
