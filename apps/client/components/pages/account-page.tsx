"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { GlowingStarsBackground } from "@repo/ui/core/glowing-starts";
import { Tabs } from "@repo/ui/core/tabs";

import { AccountTab, SecurityTab, SettingsTab } from "../account/tabs-content";
import { UnderConstructionPage } from "./under-construction-page";

export const AccountPage: FC = () => {
    const t = useTranslations("account");

    const tabs = [
        {
            name: t("account"),
            content: <AccountTab />,
        },
        {
            name: t("security"),
            content: <SecurityTab />,
        },
        {
            name: t("settings"),
            content: <SettingsTab />,
        },
        {
            name: t("statistics"),
            content: <UnderConstructionPage />,
        },
    ];

    return (
        <section className="relative flex flex-1 flex-col py-10 md:py-6">
            <GlowingStarsBackground />
            <div className="container flex flex-1 gap-6 md:flex-col md:gap-4">
                <Tabs tabs={tabs} />
            </div>
        </section>
    );
};
