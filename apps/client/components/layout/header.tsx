"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button, GhostButton } from "@repo/ui/components/button";
import { GradientLine } from "@repo/ui/components/gradient-line";
import { Logo } from "@repo/ui/components/logo";

import { Routes } from "@/enums/routes";

export const Header: FC = () => {
    const t = useTranslations("auth");

    return (
        <header className="relative flex h-16 w-full items-center">
            <div className="container flex items-center justify-between gap-4">
                <Logo href={Routes.HOME} />
                <div className="flex gap-6">
                    <GhostButton onClick={() => {}}>{t("sign_up")}</GhostButton>
                    <Button onClick={() => {}}>{t("sign_in")}</Button>
                </div>
            </div>
            <GradientLine className="absolute top-full left-0" />
        </header>
    );
};
