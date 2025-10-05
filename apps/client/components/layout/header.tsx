"use client";

import { FC } from "react";

import { Button } from "@repo/ui/components/button";
import { GradientLine } from "@repo/ui/components/gradient-line";
import { Logo } from "@repo/ui/components/logo";

import { Routes } from "@/enums/routes";

export const Header: FC = () => {
    const onButtonClick = () => {
        console.log("test");
    };

    return (
        <header className="relative flex h-16 w-full items-center">
            <div className="container flex items-center justify-between gap-4">
                <Logo href={Routes.HOME} />
                <div className="flex gap-1">
                    <Button onClick={onButtonClick}>Sign in</Button>
                </div>
            </div>
            <GradientLine className="absolute top-full left-0" />
        </header>
    );
};
