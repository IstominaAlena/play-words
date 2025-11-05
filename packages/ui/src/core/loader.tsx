"use client";

import { FC } from "react";

import { LoaderIcon } from "../icons/loader";
import { cn } from "../utils/class-names";

interface Props {
    size?: number;
    className?: string;
}

export const Loader: FC<Props> = ({ size = 20, className }) => (
    <LoaderIcon className={cn("animate-spin-smooth", className)} width={size} height={size} />
);
