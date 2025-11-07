"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";

import { Accent, Mode } from "@repo/common/enums/common";

import { Skeleton } from "../core/skeleton";
import { SliderToggle } from "../core/toggle";
import { Text } from "../core/typography";
import { getAdjustedAccent, modeIconOptions, renderGradientSwatch } from "./utils";

interface Props {
    defaultTheme?: string;
    saveTheme?: (theme: string) => void;
    isLoading?: boolean;
}

export const ThemeSwitcher: FC<Props> = ({ defaultTheme, saveTheme, isLoading }) => {
    const t = useTranslations("global");

    const { resolvedTheme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const [defaultMode, defaultAccent] = defaultTheme?.split("-") ?? [];

    const [mode, setMode] = useState<string>(defaultMode ?? Mode.DARK);
    const [accent, setAccent] = useState<string>(defaultAccent ?? Accent.GREEN);

    const modeOptions = Object.values(Mode).map((item) => ({
        label: t(item),
        value: item.toString(),
        icon: modeIconOptions[item],
    }));

    const accentOptions = Object.values(Accent)
        .filter((item) => item !== mode)
        .map((item) => ({
            value: item.toString(),
            icon: renderGradientSwatch(item),
        }));

    const handleModeChange = (newMode: string) => {
        setHasInteracted(true);
        setMode(newMode);
    };

    const handleAccentChange = (newAccent: string) => {
        setHasInteracted(true);
        setAccent(newAccent);
    };

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const [defaultMode, defaultAccent] = defaultTheme?.split("-") ?? [];

        setMode(defaultMode ?? Mode.DARK);
        setAccent(defaultAccent ?? Accent.GREEN);
    }, [defaultTheme, mounted]);

    useEffect(() => {
        if (!mode || !accent) return;

        const adjustedAccent = getAdjustedAccent(accent as Accent, mode as Mode);

        if (adjustedAccent !== accent) {
            setAccent(adjustedAccent);
            return;
        }

        const newTheme = `${mode}-${adjustedAccent}`;

        setTheme(newTheme);
    }, [mode, accent, setTheme]);

    useEffect(() => {
        if (!hasInteracted || !resolvedTheme || resolvedTheme === defaultTheme) {
            return;
        }

        saveTheme?.(resolvedTheme);
    }, [defaultTheme, hasInteracted, resolvedTheme]);

    return (
        <ul className="flex flex-col gap-6">
            <li className="flex flex-col gap-1">
                <Text>{t("mode")}</Text>
                {!mounted || !mode ? (
                    <Skeleton className="h-12 rounded-full" />
                ) : (
                    <SliderToggle
                        options={modeOptions}
                        selected={mode}
                        setSelected={handleModeChange}
                        isDisabled={isLoading}
                    />
                )}
            </li>
            <li className="flex flex-col gap-1">
                <Text>{t("accent")}</Text>
                {!mounted || !accent ? (
                    <Skeleton className="h-12 rounded-full" />
                ) : (
                    <SliderToggle
                        options={accentOptions}
                        selected={accent}
                        setSelected={handleAccentChange}
                        isDisabled={isLoading}
                    />
                )}
            </li>
        </ul>
    );
};
