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

import { DisableOtpModal } from "./disable-otp-modal";
import { OtpModalSettings } from "./otp-modal-settings";

interface Props {
    className?: string;
}

export const Security: FC<Props> = ({ className }) => {
    const t = useTranslations("account");

    const { settings } = useUserStore();

    const { Modal, openModal, closeModal } = useModal();

    const { enable } = useToggleOtp();

    const { mutateAsync: getOtp, isPending } = useGetOtpSettings();

    const isEnabled = settings?.otp;

    const onEnableButtonClick = async () => {
        try {
            if (isEnabled) {
                openModal(<DisableOtpModal closeModal={closeModal} />);
            } else {
                const data = await enable.mutateAsync();
                showToast.success(t("otp_enabled"));
                openModal(<OtpModalSettings url={data.otpAuthUrl} secret={data.secret} />);
            }
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    const onGenerateQrButtonClick = async () => {
        try {
            const data = await getOtp();

            if (data.otpAuthUrl && data.secret) {
                openModal(<OtpModalSettings url={data.otpAuthUrl} secret={data.secret} />);
            }
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <>
            <div className={cn("flex flex-col gap-6", className)}>
                <Title>{t("security")}</Title>
                <div className="xs:flex-col flex justify-between gap-6">
                    <Text className="min-w-default flex-1">{t("enable_verification")}</Text>
                    <div className="w-default xs:w-full ml-auto flex flex-wrap justify-center gap-4">
                        <Button
                            type="button"
                            variant={isEnabled ? "ERROR" : "SUCCESS"}
                            className="bg-secondary_dark"
                            onClick={onEnableButtonClick}
                            isLoading={enable.isPending}
                        >
                            {t(isEnabled ? "disable" : "enable")}
                        </Button>
                        {isEnabled && (
                            <Button
                                type="button"
                                className="bg-secondary_dark"
                                onClick={onGenerateQrButtonClick}
                                isLoading={isPending}
                            >
                                {t("generate_qr")}
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <Modal />
        </>
    );
};
