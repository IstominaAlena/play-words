import { Accent, Mode } from "@repo/common/enums/common";

import { MoonIcon } from "../icons/moon";
import { SunIcon } from "../icons/sun";
import { cn } from "../utils/class-names";

export const modeIconOptions = {
    [Mode.DARK]: <MoonIcon width={18} height={18} />,
    [Mode.LIGHT]: <SunIcon width={20} height={20} />,
};

const colorOptions = {
    [Accent.GREEN]: "from-[var(--light-green)] to-[var(--dark-green)]",
    [Accent.ORANGE]: "from-[var(--light-orange)] to-[var(--dark-orange)]",
    [Accent.PINK]: "from-[var(--light-pink)] to-[var(--dark-pink)]",
    [Accent.PURPLE]: "from-[var(--light-purple)] to-[var(--dark-purple)]",
    [Accent.BLUE]: "from-[var(--light-blue)] to-[var(--dark-blue)]",
    [Accent.LIGHT]: "from-[var(--light-light)] to-[var(--dark-light)]",
    [Accent.DARK]: "from-[var(--light-dark)] to-[var(--dark-dark)]",
};

export const renderGradientSwatch = (color: Accent) => (
    <div
        className={cn(
            "h-5 w-5 rounded-full bg-gradient-to-br",
            colorOptions[color as keyof typeof colorOptions],
        )}
    />
);

export const getAdjustedAccent = (currentAccent: Accent, newMode: Mode) => {
    if (newMode === Mode.LIGHT && currentAccent === Accent.LIGHT) return Accent.DARK;
    if (newMode === Mode.DARK && currentAccent === Accent.DARK) return Accent.LIGHT;
    return currentAccent;
};
