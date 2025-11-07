"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { Loader } from "@repo/ui/core/loader";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";
import { ThemeSwitcher } from "@repo/ui/theme/theme-switcher";

import { DEFAULT_THEME } from "@repo/common/constants/common";
import { useUserStore } from "@repo/common/stores/user-store";

import { useUpdateSettings } from "@/api/account/mutations";

interface Props {
    className?: string;
}

export const AppearanceSettings: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { settings } = useUserStore();

    const { mutateAsync: updateSettings, isPending } = useUpdateSettings();

    const defaultTheme = settings?.theme ?? DEFAULT_THEME;

    const saveTheme = async (theme: string) => {
        try {
            await updateSettings({ theme });
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="flex items-center justify-between gap-4">
                <Title>{t("appearance")}</Title>
                {isPending && <Loader />}
            </div>
            <ThemeSwitcher
                defaultTheme={defaultTheme}
                saveTheme={saveTheme}
                isLoading={isPending}
            />
        </div>
    );
};
