"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

import { Accent, Mode } from "@repo/common/enums/common";

import { SliderToggle } from "../core/toggle";
import { Text } from "../core/typography";
import { MoonIcon } from "../icons/moon";
import { SunIcon } from "../icons/sun";
import { cn } from "../utils/class-names";

const colorOptions = {
    [Accent.GREEN]: "from-[var(--light-green)] to-[var(--dark-green)]",
    [Accent.ORANGE]: "from-[var(--light-orange)] to-[var(--dark-orange)]",
    [Accent.PINK]: "from-[var(--light-pink)] to-[var(--dark-pink)]",
    [Accent.CYBER]: "from-[var(--light-cyber)] to-[var(--dark-cyber)]",
};

const modeIconOptions = {
    [Mode.DARK]: <MoonIcon width={18} height={18} />,
    [Mode.LIGHT]: <SunIcon width={20} height={20} />,
};

const renderGradientSwatch = (color: Accent) => (
    <div
        className={cn(
            "h-5 w-5 rounded-full bg-gradient-to-br",
            colorOptions[color as keyof typeof colorOptions],
        )}
    />
);

export const ThemeSwitcher: FC = () => {
    const t = useTranslations("global");

    const { resolvedTheme, setTheme } = useTheme();

    const [defaultMode, defaultAccent] = resolvedTheme?.split("-") ?? [];

    const [mode, setMode] = useState(defaultMode ?? Mode.DARK);
    const [accent, setAccent] = useState(defaultAccent ?? Accent.GREEN);

    const modeOptions = Object.values(Mode).map((item) => ({
        label: t(item),
        value: item,
        icon: modeIconOptions[item],
    }));

    const accentOptions = Object.values(Accent).map((item) => ({
        label: t(item),
        value: item,
        icon: renderGradientSwatch(item),
    }));

    useEffect(() => {
        setTheme(`${mode}-${accent}`);
    }, [mode, accent, setTheme]);

    return (
        <ul className="flex flex-col gap-6">
            <li className="flex flex-col gap-1">
                <Text>{t("mode")}</Text>
                <SliderToggle options={modeOptions} selected={mode} setSelected={setMode} />
            </li>
            <li className="flex flex-col gap-1">
                <Text>{t("accent")}</Text>
                <SliderToggle options={accentOptions} selected={accent} setSelected={setAccent} />
            </li>
        </ul>
    );
};
