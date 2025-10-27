"use client";

import { useTranslations } from "next-intl";
import { FC, useState } from "react";

import { Button } from "@repo/ui/core/button";
import { InputOTP } from "@repo/ui/core/input-otp";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useVerifyOtp } from "@/api/auth/mutations";

interface Props {
    email: string;
    closeModal: () => void;
}

export const OtpModal: FC<Props> = ({ email, closeModal }) => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");
    const tGlobal = useTranslations("global");

    const [value, setValue] = useState("");

    const { mutateAsync: verifyOtp, isPending } = useVerifyOtp();

    const onChange = (value: string) => setValue(value);

    const onSubmitButtonClick = async () => {
        try {
            await verifyOtp({ code: value, email });
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title className="text-center">{t("verify_otp_title")}</Title>
            <Text className="text-center">{t("verify_otp_description")}</Text>

            <InputOTP value={value} onChange={onChange} />

            <div className="xs:flex-col flex w-full items-center gap-4">
                <Button
                    type="button"
                    variant="SUCCESS"
                    isLoading={isPending}
                    onClick={onSubmitButtonClick}
                    className="bg-secondary_dark"
                    disabled={value.length < 6}
                >
                    {tForm("submit")}
                </Button>
                <Button className="bg-secondary_dark" onClick={closeModal}>
                    {tGlobal("cancel")}
                </Button>
            </div>
        </div>
    );
};
