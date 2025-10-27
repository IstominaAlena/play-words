"use client";

import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import { Link } from "@repo/i18n/config/navigation";

import { DropdownMenu, DropdownMenuItem } from "../core/dropdown-menu";
import { HoverBorderGradient } from "../core/hover-border-gradient";
import { Text } from "../core/typography";
import { AccountIcon } from "../icons/account";
import { LogoutIcon } from "../icons/logout";
import { cn } from "../utils/class-names";

interface Props {
    name: string;
    accountPath: string;
    onLogout: () => void;
    className?: string;
}

export const AccountDropdown: FC<Props> = ({ name, accountPath, onLogout, className }) => {
    const t = useTranslations("auth");
    const tNav = useTranslations("navigation");

    const trigger = useMemo(
        () => (
            <HoverBorderGradient
                containerClassName="max-w-default w-full md:max-w-11"
                className="text-secondary_light group-hover:text-primary_light flex items-center gap-2"
                variant="SUCCESS"
            >
                <AccountIcon width={16} height={16} className="text-inherit" />
                <Text className="text-inherit md:hidden">{name}</Text>
            </HoverBorderGradient>
        ),
        [name],
    );

    const accountLink = (
        <Link
            key="0"
            href={accountPath}
            className={cn(
                "text-secondary_light group hover:text-accent_dark flex items-center gap-2 px-4 py-2 transition-all duration-300",
            )}
        >
            <AccountIcon className="text-inherit" width={16} height={16} />
            <Text className="text-inherit">{tNav("account")}</Text>
        </Link>
    );

    const logoutButton = (
        <div onClick={onLogout} className="group">
            <div className="text-secondary_light group-hover:text-error_dark flex cursor-pointer items-center gap-2 px-4 py-2 transition-all duration-300">
                <LogoutIcon className="text-inherit" width={16} height={16} />
                <Text className="text-inherit">{t("logout")}</Text>
            </div>
        </div>
    );

    const content = [accountLink, logoutButton];

    return (
        <DropdownMenu
            trigger={trigger}
            triggerClassName={cn(
                "border border-transparent rounded-full p-1 data-[state=open]:border-accent_light transition-all duration-300",
                className,
            )}
            content={content}
            contentClassName={className}
        />
    );
};
