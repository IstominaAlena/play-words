"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "@repo/ui/core/button";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useToggleOtp } from "@/api/account/mutations";

interface Props {
    closeModal: () => void;
}

export const DisableOtpModal: FC<Props> = ({ closeModal }) => {
    const t = useTranslations("account");
    const tGlobal = useTranslations("global");

    const { disable } = useToggleOtp();

    const onSubmitButtonClick = async () => {
        try {
            await disable.mutateAsync();
            showToast.success(t("otp_disabled"));
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title>{t("disable_otp_title")}</Title>
            <Text>{t("disable_otp_description")}</Text>

            <div className="xs:flex-col flex w-full items-center gap-4">
                <Button
                    type="button"
                    variant="ERROR"
                    isLoading={disable.isPending}
                    onClick={onSubmitButtonClick}
                    className="bg-secondary_dark"
                >
                    {t("disable")}
                </Button>
                <Button className="bg-secondary_dark" onClick={closeModal}>
                    {tGlobal("cancel")}
                </Button>
            </div>
        </div>
    );
};
