"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { GoogleButton } from "@repo/ui/components/google-button";
import { Text, Title } from "@repo/ui/core/typography";

import { useUserStore } from "@repo/common/stores/user-store";

interface Props {
    className?: string;
}

export const ConnectOtherAccounts: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { settings } = useUserStore();

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("connect_accounts")}</Title>
            <div className="flex flex-wrap items-center justify-between gap-6">
                <Text className="min-w-[12rem] flex-1">{t("connect_google")}</Text>
                <GoogleButton
                    text={t(settings?.google ? "disconnect" : "connect")}
                    url={`${process.env.NEXT_PUBLIC_API_URL}/users/google/connect`}
                    className="ml-auto w-[12rem] sm:w-full"
                />
            </div>
        </div>
    );
};
