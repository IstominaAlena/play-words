"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { Title } from "@repo/ui/core/typography";
import { ThemeSwitcher } from "@repo/ui/theme/theme-switcher";

interface Props {
    className?: string;
}

export const AppearanceSettings: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const defaultTheme = "";

    const saveTheme = (theme: string) => {
        console.log("==========>>>", theme);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("appearance")}</Title>
            <ThemeSwitcher defaultTheme={defaultTheme} saveTheme={saveTheme} />
        </div>
    );
};
