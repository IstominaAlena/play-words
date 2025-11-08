"use client";

import { FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";

interface Props extends PropsWithChildren {
    className?: string;
}

export const PageTitle: FC<Props> = ({ children, className }) => (
    <h1 className={cn("text-secondary_text text-6xl font-bold md:text-3xl", className)}>
        {children}
    </h1>
);

export const Title: FC<Props> = ({ children, className }) => (
    <h3 className={cn("text-primary_text text-3xl font-medium md:text-xl", className)}>
        {children}
    </h3>
);

export const Text: FC<Props> = ({ children, className }) => (
    <p className={cn("text-neutral text-base font-normal md:text-sm", className)}>{children}</p>
);
