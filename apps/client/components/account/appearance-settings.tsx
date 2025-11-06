"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

import { cn } from "@repo/ui/class-names";
import { SliderToggle } from "@repo/ui/core/toggle";
import { Text, Title } from "@repo/ui/core/typography";
import { MoonIcon } from "@repo/ui/icons/moon";
import { SunIcon } from "@repo/ui/icons/sun";

import { Accent, Mode } from "@repo/common/enums/common";

interface Props {
    className?: string;
}

export const AppearanceSettings: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { resolvedTheme, setTheme } = useTheme();

    const [defaultMode, defaultAccent] = resolvedTheme?.split("-") ?? [];

    const [mode, setMode] = useState(defaultMode ?? Mode.DARK);
    const [accent, setAccent] = useState(defaultAccent ?? Accent.GREEN);

    const modeOptions = [
        { label: t("dark"), value: "dark", icon: <MoonIcon width={18} height={18} /> },
        { label: t("light"), value: "light", icon: <SunIcon width={20} height={20} /> },
    ];

    const accentOptions = [
        { label: "Green", value: "green" },
        { label: "Orange", value: "orange" },
        { label: "Pink", value: "pink" },
        { label: "Cyber", value: "cyber" },
    ];

    useEffect(() => {
        setTheme(`${mode}-${accent}`);
    }, [mode, accent]);

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("appearance")}</Title>
            <ul className="flex flex-col gap-6">
                <li className="flex flex-col gap-1">
                    <Text>{t("mode")}</Text>
                    <SliderToggle options={modeOptions} selected={mode} setSelected={setMode} />
                </li>
                <li className="flex flex-col gap-1">
                    <Text>{t("accent")}</Text>
                    <SliderToggle
                        options={accentOptions}
                        selected={accent}
                        setSelected={setAccent}
                    />
                </li>
            </ul>
        </div>
    );
};
