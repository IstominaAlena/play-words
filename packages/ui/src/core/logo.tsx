"use client";

import { FC } from "react";

import { Link } from "@repo/i18n/config/navigation";

import { LogoIcon } from "../icons/logo";

interface Props {
    href: string;
}

export const Logo: FC<Props> = ({ href }) => (
    <Link href={href} className="flex w-40 items-center justify-center pt-2 pr-5">
        <div className="relative flex w-fit items-baseline text-3xl font-bold">
            <LogoIcon width={150} height={64} />
        </div>
    </Link>
);
