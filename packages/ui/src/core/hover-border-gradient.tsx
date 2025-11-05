"use client";

import { FC, HTMLAttributes, PropsWithChildren } from "react";

import { Variant } from "@repo/common/types/common";

import { cn } from "../utils/class-names";

interface Props {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    variant?: Variant;
}

const colorMap = {
    SUCCESS:
        "radial-gradient(20.7% 50% at 50% 100%, var(--accent_light) 0%, var(--accent_dark) 100%)",
    ERROR: "radial-gradient(20.7% 50% at 50% 100%, var(--error_light) 0%, var(--error_dark) 100%)",
    WARN: "radial-gradient(20.7% 50% at 50% 100%, var(--warn_light) 0%, var(--warn_dark) 100%)",
    NEUTRAL: "radial-gradient(20.7% 50% at 50% 100%, var(--neutral-glow) 0%, var(--neutral) 100%)",
};

export const HoverBorderGradient: FC<PropsWithChildren<Props & HTMLAttributes<HTMLElement>>> = ({
    children,
    containerClassName,
    className,
    as: Tag = "div",
    variant = "NEUTRAL",
    ...props
}) => {
    return (
        <Tag
            className={cn(
                "group relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full decoration-clone p-px transition duration-500",
                containerClassName,
            )}
            {...props}
        >
            <div
                className={cn(
                    "bg-primary_bg text-primary_text z-10 flex min-h-10 w-full cursor-pointer items-center justify-center rounded-[inherit] px-5 py-2 text-sm capitalize",
                    className,
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    "absolute inset-0 z-0 h-full w-full flex-none overflow-hidden rounded-[inherit] blur-[2px] transition-all duration-300 group-hover:blur-xs",
                )}
                style={{ background: colorMap[variant] }}
            />
        </Tag>
    );
};
