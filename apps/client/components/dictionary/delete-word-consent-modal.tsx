"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "@repo/ui/core/button";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useDeleteWord } from "@/api/dictionary/mutations";

interface Props {
    id: number;
    closeModal: () => void;
}

export const DeleteWordConsentModal: FC<Props> = ({ id, closeModal }) => {
    const t = useTranslations("dictionary");
    const tGlobal = useTranslations("global");

    const { mutateAsync: deleteWord, isPending } = useDeleteWord();

    const onSubmitButtonClick = async () => {
        try {
            await deleteWord(id);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title>{t("delete_word")}</Title>
            <Text className="text-center">{t("delete_word_subtitle")}</Text>

            <div className="xs:flex-col flex w-full items-center gap-4">
                <Button
                    type="button"
                    variant="ERROR"
                    isLoading={isPending}
                    onClick={onSubmitButtonClick}
                    className="bg-secondary_dark"
                >
                    {tGlobal("delete")}
                </Button>
                <Button className="bg-secondary_dark" onClick={closeModal}>
                    {tGlobal("cancel")}
                </Button>
            </div>
        </div>
    );
};
