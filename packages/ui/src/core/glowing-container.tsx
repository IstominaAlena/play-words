"use client";

import { FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";

interface Props extends PropsWithChildren {
    containerClassName?: string;
    contentClassName?: string;
    glowClassName?: string;
}

export const GlowingContainer: FC<Props> = ({
    children,
    containerClassName,
    contentClassName,
    glowClassName,
}) => {
    return (
        <div
            className={cn(
                "group relative h-min w-full cursor-pointer rounded-full p-px",
                containerClassName,
            )}
        >
            <div
                className={cn(
                    "bg-primary_dark text-primary_light relative z-10 h-full w-full rounded-[inherit] px-5 py-2 text-sm",
                    contentClassName,
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    "bg-primary_light/20 group-hover:bg-primary_light/30 absolute top-1/2 left-1/2 z-1 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[inherit] blur-[2px] transition-all duration-300 group-hover:blur-xs",
                    glowClassName,
                )}
            />
        </div>
    );
};
