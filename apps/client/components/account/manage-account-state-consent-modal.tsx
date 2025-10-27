"use client";

import { useTranslations } from "next-intl";
import { ChangeEvent, FC, useState } from "react";

import { Button } from "@repo/ui/core/button";
import { Input } from "@repo/ui/core/input";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useManageAccountState } from "@/api/account/mutations";

interface Props {
    closeModal: () => void;
    deletionDate: string | null;
    email: string | null;
}

export const ManageAccountStateConsentModal: FC<Props> = ({ closeModal, deletionDate, email }) => {
    const t = useTranslations("account");
    const tGlobal = useTranslations("global");

    const [value, setValue] = useState("");

    const { deleteUser, restoreUser } = useManageAccountState();

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setValue(value);
    };

    const onButtonClick = async () => {
        if (value !== email) {
            showToast.error(t("consent_failed"));
            return;
        }

        try {
            if (deletionDate) {
                await restoreUser.mutateAsync();
            } else {
                await deleteUser.mutateAsync();
            }
            showToast.success(tGlobal("request_sent"));
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title>{t("manage_account_modal_title")}</Title>
            <div>
                <Text className="text-center">{t("manage_account_modal_description")}</Text>
                {!deletionDate && (
                    <Text className="text-center">{t("manage_account_modal_text")}</Text>
                )}
            </div>

            <Input className="bg-secondary_dark" value={value} onChange={onInputChange} />

            <div className="xs:flex-col flex w-full items-center gap-4">
                <Button
                    variant={deletionDate ? "SUCCESS" : "ERROR"}
                    isLoading={deleteUser.isPending || restoreUser.isPending}
                    disabled={!value}
                    onClick={onButtonClick}
                    className="bg-secondary_dark"
                >
                    {t(deletionDate ? "restore" : "delete")}
                </Button>
                <Button className="bg-secondary_dark" onClick={closeModal}>
                    {tGlobal("cancel")}
                </Button>
            </div>
        </div>
    );
};
