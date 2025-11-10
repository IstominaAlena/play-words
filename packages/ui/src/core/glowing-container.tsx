import { FC, PropsWithChildren } from "react";

import { Variant } from "@repo/common/types/common";

import { cn } from "../utils/class-names";

interface Props extends PropsWithChildren {
    containerClassName?: string;
    contentClassName?: string;
    variant?: Variant;
}

const colorMap = {
    SUCCESS: "shadow-accent_light",
    ERROR: "shadow-error_dark",
    WARN: "shadow-warn_dark",
    NEUTRAL: "shadow-neutral_glow",
};

const accentColorMap = {
    SUCCESS: "shadow-accent_light",
    ERROR: "shadow-error_light",
    WARN: "shadow-warn_light",
    NEUTRAL: "shadow-neutral_glow",
};

export const GlowingContainer: FC<Props> = ({
    children,
    containerClassName,
    contentClassName,
    variant = "NEUTRAL",
}) => {
    return (
        <div
            className={cn(
                "group relative h-10 w-full rounded-full p-px hover:shadow-[0_0_15px_0_rgba(0,0,0,0.25)]",
                colorMap[variant],
                containerClassName,
            )}
        >
            <div
                className={cn(
                    "bg-primary_bg text-primary_text relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-[inherit] px-5 py-2 text-sm shadow-[0_0_5px_0_rgba(0,0,0,0.25)]",
                    "group-hover:shadow-[0_0_5px_0_rgba(0,0,0,0.25)]",
                    accentColorMap[variant],
                    contentClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
};
