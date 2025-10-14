"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { GoogleButton } from "@repo/ui/components/google-button";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useUserStore } from "@repo/common/stores/user-store";

import { useDisconnectGoogleAccount } from "@/api/account/mutations";

interface Props {
    className?: string;
}

export const ConnectOtherAccounts: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { settings } = useUserStore();

    const { mutateAsync: disconnectGoogleAccount, isPending } = useDisconnectGoogleAccount();

    const onDisconnectButtonClick = async () => {
        try {
            await disconnectGoogleAccount();
            showToast.success(t("disconnected"));
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("connect_accounts")}</Title>
            <div className="flex flex-wrap items-center justify-between gap-6">
                <Text className="min-w-[12rem] flex-1">{t("connect_google")}</Text>
                <GoogleButton
                    isLoading={isPending}
                    text={t(settings?.google ? "disconnect" : "connect")}
                    url={
                        settings?.google
                            ? null
                            : `${process.env.NEXT_PUBLIC_API_URL}/users/google/connect`
                    }
                    onClick={settings?.google ? onDisconnectButtonClick : undefined}
                    className="ml-auto w-[12rem] sm:w-full"
                />
            </div>
        </div>
    );
};
