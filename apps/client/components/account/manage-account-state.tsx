"use client";

import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import { cn } from "@repo/ui/class-names";
import { Button } from "@repo/ui/core/button";
import { Text } from "@repo/ui/core/typography";

import { DELETE_USER_REMAINING_PERIOD } from "@repo/common/constants/common";
import { useModal } from "@repo/common/hooks/use-modal.tsx";

import { ManageAccountStateConsentModal } from "./manage-account-state-consent-modal";

interface Props {
    deletionDate: string | null;
    email: string | null;
}

export const ManageAccountState: FC<Props> = ({ deletionDate, email }) => {
    const t = useTranslations("account");

    const { Modal, openModal, closeModal } = useModal();

    const onButtonClick = () => {
        openModal(
            <ManageAccountStateConsentModal
                closeModal={closeModal}
                deletionDate={deletionDate}
                email={email}
            />,
        );
    };

    const remainingDays = useMemo(() => {
        if (!deletionDate) return DELETE_USER_REMAINING_PERIOD;

        const now = dayjs();
        const deletion = dayjs(deletionDate);
        const diff = deletion.diff(now, "day");

        return diff > 0 ? diff : 0;
    }, [deletionDate]);

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex-1">
                    <Text className="text-primary_text">{t("delete_account")}</Text>
                    <Text>
                        {t.rich("delete_account_description", {
                            accent: (chunks) => (
                                <span
                                    className={cn(
                                        deletionDate && "text-error_dark font-bold underline",
                                    )}
                                >
                                    {remainingDays}&nbsp;
                                    {chunks}
                                </span>
                            ),
                        })}
                    </Text>
                </div>
                <Button
                    variant={deletionDate ? "SUCCESS" : "ERROR"}
                    onClick={onButtonClick}
                    buttonClassName="ml-auto w-default! sm:w-full"
                    className="bg-secondary_bg"
                >
                    {t(deletionDate ? "restore" : "delete")}
                </Button>
            </div>

            <Modal />
        </>
    );
};
