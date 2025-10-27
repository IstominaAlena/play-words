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
        "radial-gradient(20.7% 50% at 50% 100%, rgba(6, 214, 160, 1) 0%, rgba(16, 79, 85, 1) 100%)",
    ERROR: "radial-gradient(20.7% 50% at 50% 100%, rgba(230, 10, 12, 1) 0%, rgba(128, 5, 22, 1) 100%)",
    WARN: "radial-gradient(20.7% 50% at 50% 100%, rgba(252, 249, 54, 1) 0%, rgba(191, 144, 3, 1) 100%)",
    NEUTRAL:
        "radial-gradient(20.7% 50% at 50% 100%, rgba(235, 235, 235, 1) 0%, rgba(112, 112, 112, 1) 100%)",
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
                    "bg-primary_dark text-primary_light z-10 flex min-h-10 w-full cursor-pointer items-center justify-center rounded-[inherit] px-5 py-2 text-sm capitalize",
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
