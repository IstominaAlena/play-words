"use client";

import { FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";

interface Props extends PropsWithChildren {
    className?: string;
}

export const PageTitle: FC<Props> = ({ children, className }) => (
    <h2 className={cn("text-secondary_light text-6xl font-bold capitalize md:text-3xl", className)}>
        {children}
    </h2>
);

export const Title: FC<Props> = ({ children, className }) => (
    <h3 className={cn("text-primary_light text-3xl font-medium capitalize md:text-xl", className)}>
        {children}
    </h3>
);

export const Text: FC<Props> = ({ children, className }) => (
    <p className={cn("text-neutral text-base font-normal md:text-sm", className)}>{children}</p>
);
