"use client";

import { FC } from "react";

import { LoaderIcon } from "../icons/loader";

interface Props {
    size?: number;
}

export const Loader: FC<Props> = ({ size = 20 }) => (
    <LoaderIcon className="animate-spin-smooth" width={size} height={size} />
);
