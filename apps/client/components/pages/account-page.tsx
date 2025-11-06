"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

import { GlowingStarsBackground } from "@repo/ui/core/glowing-starts";
import { Tabs } from "@repo/ui/core/tabs";

import { useRouter } from "@repo/i18n/config/navigation";

import { AccountTab, SecurityTab, SettingsTab } from "../account/tabs-content";
import { UnderConstructionPage } from "./under-construction-page";

const useSearchParamsState = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (cb: (params: URLSearchParams) => void) => {
        const params = new URLSearchParams(searchParams);
        cb(params);
        router.push(`?${params.toString()}`);
    };
};

export const AccountPage: FC = () => {
    const t = useTranslations("account");

    const searchParams = useSearchParams();
    const mutateParams = useSearchParamsState();

    const tabs = [
        {
            name: "account",
            label: t("account"),
            content: <AccountTab />,
        },
        {
            name: "security",
            label: t("security"),
            content: <SecurityTab />,
        },
        {
            name: "settings",
            label: t("settings"),
            content: <SettingsTab />,
        },
        {
            name: "statistics",
            label: t("statistics"),
            content: <UnderConstructionPage />,
        },
    ];

    const currentTab = searchParams.get("tab") ?? tabs[0]?.name;

    const onTabClick = (tab: string) => () => {
        mutateParams((params) => {
            const currentValue = params.get("tab");
            if (currentValue === tab) {
                params.delete("tab");
            } else {
                params.set("tab", tab);
            }
        });
    };

    return (
        <section className="relative flex flex-1 flex-col py-10 md:py-6">
            <GlowingStarsBackground />
            <div className="container flex flex-1 gap-6 md:flex-col md:gap-4">
                <Tabs tabs={tabs} onTabClick={onTabClick} defaultTab={currentTab} />
            </div>
        </section>
    );
};
