"use client";

import { useTranslations } from "next-intl";
import { FC, MouseEvent, ReactNode, useCallback, useMemo } from "react";

import { cn } from "@repo/ui/class-names";
import { ConsentModal } from "@repo/ui/components/consent-modal";
import { GhostButton } from "@repo/ui/core/button";
import { HoverBorderGradient } from "@repo/ui/core/hover-border-gradient";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";
import { DeleteIcon } from "@repo/ui/icons/delete";
import { EditIcon } from "@repo/ui/icons/edit";
import { OpenEyeIcon } from "@repo/ui/icons/open-eye";

import { useUserStore } from "@repo/common/stores/user-store";
import { Word } from "@repo/common/types/dictionary";

import { useDeleteWord } from "@/api/dictionary/mutations";

import { WordModal } from "./word-modal";

interface Props {
    data: Word;
    isPreview?: boolean;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const DictionaryCard: FC<Props> = ({ data, isPreview, openModal, closeModal }) => {
    const t = useTranslations("dictionary");
    const tGlobal = useTranslations("global");

    const { user } = useUserStore();

    const { wordId, word, translations, definitions } = data;

    const displayedTranslations = isPreview ? translations.slice(0, 5) : translations;
    const translationsAmount = translations.length > 5 ? translations.length - 5 : 0;

    const displayedDefinitions = isPreview ? definitions.slice(0, 1) : definitions;
    const definitionsAmount = definitions.length > 1 ? definitions.length - 1 : 0;

    const { mutateAsync: deleteWord, isPending } = useDeleteWord();

    const onConfirmButtonClick = useCallback(async () => {
        try {
            await deleteWord(wordId);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    }, [closeModal, deleteWord, wordId]);

    const renderListItem = (value: string) => (
        <li
            key={value}
            className="relative normal-case after:content-[','] last:after:content-none"
        >
            {value}
        </li>
    );

    const renderDetails = useCallback(
        (label: string, amount: number, data: string[], className?: string) => (
            <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                    <Text>{t(label)}</Text>
                    {!!amount && isPreview && (
                        <Text className="underline">
                            +{amount} {tGlobal("more")}
                        </Text>
                    )}
                </div>
                <ul className={cn("flex flex-wrap gap-1 text-lg", className)}>
                    {data.map(renderListItem)}
                </ul>
            </div>
        ),
        [isPreview, t, tGlobal],
    );

    const onViewButtonClick = useCallback(
        () =>
            openModal(<DictionaryCard data={data} openModal={openModal} closeModal={closeModal} />),
        [closeModal, data, openModal],
    );

    const onEditButtonClick = useCallback(
        () => openModal(<WordModal closeModal={closeModal} data={data} />),
        [closeModal, data, openModal],
    );

    const onDeleteButtonClick = useCallback(
        () =>
            openModal(
                <ConsentModal
                    title={t("delete_word")}
                    text={t("delete_word_subtitle", { word: data.word })}
                    onCancel={closeModal}
                    onConfirm={onConfirmButtonClick}
                    isLoading={isPending}
                />,
            ),
        [closeModal, data.word, isPending, onConfirmButtonClick, openModal, t],
    );

    const buttons = useMemo(
        () => (
            <div className="flex items-center gap-1">
                {isPreview && (
                    <GhostButton
                        onClick={onViewButtonClick}
                        className="text-accent_dark hover:text-accent_light p-2 duration-300"
                    >
                        <OpenEyeIcon width={18} height={18} />
                    </GhostButton>
                )}
                {user && (
                    <>
                        <GhostButton
                            onClick={onEditButtonClick}
                            className="text-warn_dark hover:text-warn_light p-2 duration-300"
                        >
                            <EditIcon width={16} height={16} />
                        </GhostButton>
                        <GhostButton
                            onClick={onDeleteButtonClick}
                            className="text-error_dark hover:text-error_light p-2 duration-300"
                        >
                            <DeleteIcon width={16} height={16} />
                        </GhostButton>
                    </>
                )}
            </div>
        ),
        [isPreview, onDeleteButtonClick, onEditButtonClick, onViewButtonClick, user],
    );

    return (
        <HoverBorderGradient
            containerClassName="rounded-lg w-full h-full"
            className="bg-secondary_dark group h-full"
            variant="SUCCESS"
        >
            <div
                className={cn(
                    "flex w-full gap-10 md:flex-col md:gap-4",
                    !isPreview && "flex-col gap-4",
                )}
            >
                <div className="flex-1">
                    <Text>{t("word")}</Text>
                    <Title>{word}</Title>
                </div>
                <div className="flex-2">
                    {renderDetails("translations", translationsAmount, displayedTranslations)}
                </div>
                <div className="flex-2">
                    {renderDetails(
                        "definitions",
                        definitionsAmount,
                        displayedDefinitions,
                        !isPreview ? "ml-4 list-disc" : "",
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <Text>{t("actions")}</Text>

                    {buttons}
                </div>
            </div>
        </HoverBorderGradient>
    );
};
