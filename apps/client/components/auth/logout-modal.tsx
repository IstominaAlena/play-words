"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button, SecondaryButton } from "@repo/ui/core/button";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useLogout } from "@/api/auth/mutations";

interface Props {
    closeModal: () => void;
}

export const LogoutModal: FC<Props> = ({ closeModal }) => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");
    const tGlobal = useTranslations("global");

    const { mutateAsync: logout, isPending } = useLogout();

    const onSubmitButtonClick = async () => {
        try {
            await logout();
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title>{t("logout")}</Title>
            <Text>{t("logout_subtitle")}</Text>

            <div className="xs:flex-col flex w-full items-center gap-4">
                <Button
                    type="button"
                    isLoading={isPending}
                    onClick={onSubmitButtonClick}
                    className="bg-secondary_dark"
                >
                    {tForm("submit")}
                </Button>
                <SecondaryButton className="bg-secondary_dark" onClick={closeModal}>
                    {tGlobal("cancel")}
                </SecondaryButton>
            </div>
        </div>
    );
};
