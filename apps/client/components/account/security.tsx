"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { Button } from "@repo/ui/core/button";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useModal } from "@repo/common/hooks/use-modal.tsx";
import { useUserStore } from "@repo/common/stores/user-store";

import { useToggleOtp } from "@/api/account/mutations";

import { EnableOtpModal } from "./enable-otp-modal";

interface Props {
    className?: string;
}

export const Security: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { settings } = useUserStore();

    const { Modal, openModal } = useModal();

    const { enable, disable } = useToggleOtp();

    const isEnabled = settings?.otp;

    const onButtonClick = async () => {
        try {
            if (isEnabled) {
                await disable.mutateAsync();
                showToast.success(t("otp_disabled"));
            } else {
                const data = await enable.mutateAsync();
                showToast.success(t("otp_enabled"));
                openModal(<EnableOtpModal url={data.otpAuthUrl} />);
            }
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <>
            <div className={cn("flex flex-col gap-6", className)}>
                <Title>{t("security")}</Title>
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <Text className="min-w-[12rem] flex-1">{t("enable_verification")}</Text>
                    <Button
                        type="button"
                        className="bg-secondary_dark"
                        buttonClassName="w-[12rem] ml-auto"
                        onClick={onButtonClick}
                        isLoading={enable.isPending || disable.isPending}
                    >
                        {t(isEnabled ? "disable" : "enable")}
                    </Button>
                </div>
            </div>

            <Modal />
        </>
    );
};
