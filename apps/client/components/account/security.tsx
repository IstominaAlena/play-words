"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { Button } from "@repo/ui/core/button";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useModal } from "@repo/common/hooks/use-modal.tsx";
import { useUserStore } from "@repo/common/stores/user-store";

import { useGetOtpSettings, useToggleOtp } from "@/api/account/mutations";

import { OtpModal } from "./otp-modal";

interface Props {
    className?: string;
}

export const Security: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { settings } = useUserStore();

    const { Modal, openModal } = useModal();

    const { enable, disable } = useToggleOtp();

    const { mutateAsync: getOtp, isPending } = useGetOtpSettings();

    const isEnabled = settings?.otp;

    const onEnableButtonClick = async () => {
        try {
            if (isEnabled) {
                await disable.mutateAsync();
                showToast.success(t("otp_disabled"));
            } else {
                const data = await enable.mutateAsync();
                showToast.success(t("otp_enabled"));
                openModal(<OtpModal url={data.otpAuthUrl} secret={data.secret} />);
            }
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    const onGenerateQrButtonClick = async () => {
        try {
            const data = await getOtp();

            if (data.otpAuthUrl && data.secret) {
                openModal(<OtpModal url={data.otpAuthUrl} secret={data.secret} />);
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
                    <Text className="min-w-default flex-1">{t("enable_verification")}</Text>
                    <Button
                        type="button"
                        variant={isEnabled ? "ERROR" : "SUCCESS"}
                        className="bg-secondary_dark"
                        buttonClassName="w-default! ml-auto"
                        onClick={onEnableButtonClick}
                        isLoading={enable.isPending || disable.isPending}
                    >
                        {t(isEnabled ? "disable" : "enable")}
                    </Button>
                    {isEnabled && (
                        <Button
                            type="button"
                            className="bg-secondary_dark"
                            buttonClassName="w-default! ml-auto"
                            onClick={onGenerateQrButtonClick}
                            isLoading={isPending}
                        >
                            {t("generate_qr")}
                        </Button>
                    )}
                </div>
            </div>

            <Modal />
        </>
    );
};
