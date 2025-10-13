"use client";

import { FC } from "react";

import { Link } from "@repo/i18n/config/navigation";

import { FeatherIcon } from "../icons/feather";
import { OutlinedText } from "../icons/outlined-text";
import { GradientText } from "./gradient-text";

interface Props {
    href: string;
}

export const Logo: FC<Props> = ({ href }) => (
    <Link href={href} className="flex w-40 items-center justify-center pt-2 pr-5">
        <div className="relative flex w-fit items-baseline text-3xl font-bold">
            <FeatherIcon
                width={40}
                height={40}
                className="absolute top-1/2 left-0 -translate-x-3/4 -translate-y-2/3"
            />
            <GradientText text="Play" />
            <OutlinedText
                text="Words"
                height={30}
                width={90}
                className="absolute top-0 left-1/2 translate-x-2 rotate-20"
            />
        </div>
    </Link>
);
