"use client";

import { FC } from "react";

import { cn } from "../utils/class-names";

interface Props {
    className?: string;
}

export const Skeleton: FC<Props> = ({ className }) => {
    return (
        <div
            className={cn("bg-primary_light/15 h-full w-full animate-pulse rounded-lg", className)}
        />
    );
};
