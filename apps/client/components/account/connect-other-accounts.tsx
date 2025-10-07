"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "@repo/ui/core/button";
import { Text, Title } from "@repo/ui/core/typography";

export const ConnectOtherAccounts: FC = () => {
    const t = useTranslations("account");

    return (
        <div className="flex flex-col gap-6">
            <Title>{t("connect_accounts")}</Title>
            <div className="flex flex-wrap items-center justify-between gap-6">
                <Text className="min-w-[12rem] flex-1">{t("connect_google")}</Text>
                <Button
                    type="button"
                    className="bg-secondary_dark"
                    buttonClassName="w-[12rem] ml-auto"
                >
                    {t("connect")}
                </Button>
            </div>
        </div>
    );
};
