"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { SliderToggle } from "@repo/ui/core/toggle";
import { Text, Title } from "@repo/ui/core/typography";
import { MoonIcon } from "@repo/ui/icons/moon";
import { StarIcon } from "@repo/ui/icons/star";
import { SunIcon } from "@repo/ui/icons/sun";

import { Mode } from "@repo/common/enums/common";

interface Props {
    className?: string;
}

const modeOptions = [
    { label: "Dark", value: Mode.DARK, icon: <MoonIcon width={18} height={18} /> },
    { label: "Light", value: Mode.LIGHT, icon: <SunIcon width={20} height={20} /> },
    { label: "System", value: Mode.SYSTEM, icon: <StarIcon width={18} height={18} /> },
];

export const AppearanceSettings: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { theme, setTheme } = useTheme();

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("appearance")}</Title>
            <ul>
                <li className="flex flex-col gap-4">
                    <Text className="text-primary_text text-xl">{t("mode")}</Text>
                    <SliderToggle
                        options={modeOptions}
                        selected={theme ?? Mode.SYSTEM}
                        setSelected={setTheme}
                    />
                </li>
            </ul>
        </div>
    );
};
