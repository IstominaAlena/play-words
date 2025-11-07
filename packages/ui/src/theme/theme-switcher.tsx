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

    const [mode, setMode] = useState<string>("");
    const [accent, setAccent] = useState<string>("");

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

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        if (!mounted || !resolvedTheme) {
            return;
        }

        const themeToApply = defaultTheme || resolvedTheme || "dark-green";
        const [initialMode, initialAccent] = themeToApply.split("-");

        setMode((initialMode as Mode) || Mode.DARK);
        setAccent((initialAccent as Accent) || Accent.GREEN);
    }, [mounted, resolvedTheme, defaultTheme]);

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

    return (
        <ul className="flex flex-col gap-6">
            <li className="flex flex-col gap-1">
                <Text>{t("mode")}</Text>
                {!mounted && !mode ? (
                    <Skeleton className="h-10 rounded-full" />
                ) : (
                    <SliderToggle
                        options={modeOptions}
                        selected={mode}
                        setSelected={setMode}
                        isDisabled={isLoading}
                    />
                )}
            </li>
            <li className="flex flex-col gap-1">
                <Text>{t("accent")}</Text>
                {!mounted && !accent ? (
                    <Skeleton className="h-10 rounded-full" />
                ) : (
                    <SliderToggle
                        options={accentOptions}
                        selected={accent}
                        setSelected={setAccent}
                        isDisabled={isLoading}
                    />
                )}
            </li>
        </ul>
    );
};
