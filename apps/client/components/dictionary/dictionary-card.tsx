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

import { DictionaryItem } from "@repo/common/types/dictionary";

import { useDeleteWord } from "@/api/dictionary/mutations";

interface Props {
    id: number;
    word: string;
    translations: DictionaryItem[];
    definitions: DictionaryItem[];
    isPreview?: boolean;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const DictionaryCard: FC<Props> = ({
    id,
    word,
    translations,
    definitions,
    isPreview,
    openModal,
    closeModal,
}) => {
    const t = useTranslations("dictionary");
    const tGlobal = useTranslations("global");

    const displayedTranslations = isPreview ? translations.slice(0, 5) : translations;
    const translationsAmount = translations.length > 5 ? translations.length - 5 : 0;

    const displayedDefinitions = isPreview ? definitions.slice(0, 1) : definitions;
    const definitionsAmount = definitions.length > 1 ? definitions.length - 1 : 0;

    const { mutateAsync: deleteWord, isPending } = useDeleteWord();

    const onConfirmButtonClick = async () => {
        try {
            await deleteWord(id);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    const renderListItem = ({ id, value }: DictionaryItem) => (
        <li key={id} className="relative normal-case after:content-[','] last:after:content-none">
            {value}
        </li>
    );

    const renderDetails = useCallback(
        (label: string, amount: number, data: DictionaryItem[], className?: string) => (
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

    const onEditButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    const onDeleteButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openModal(
            <ConsentModal
                title={t("delete_word")}
                text={t("delete_word_subtitle")}
                onCancel={closeModal}
                onConfirm={onConfirmButtonClick}
                isLoading={isPending}
            />,
        );
    };

    const buttons = useMemo(
        () => (
            <div
                className={cn(
                    "flex items-center",
                    isPreview && "opacity-0 duration-300 group-hover:opacity-100",
                )}
            >
                <GhostButton onClick={onEditButtonClick} className="p-2">
                    <EditIcon
                        className="text-accent_dark hover:text-accent_light cursor-pointer duration-300"
                        width={16}
                        height={16}
                    />
                </GhostButton>
                <GhostButton onClick={onDeleteButtonClick} className="p-2">
                    <DeleteIcon
                        className="text-error_dark hover:text-error_light cursor-pointer duration-300"
                        width={16}
                        height={16}
                    />
                </GhostButton>
            </div>
        ),
        [isPreview],
    );

    return (
        <HoverBorderGradient
            containerClassName="rounded-lg w-full h-full"
            className="bg-secondary_dark group h-full"
            variant="SUCCESS"
        >
            <div className="flex h-full w-full flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                    <Title>{word}</Title>
                    {buttons}
                </div>
                {renderDetails("translations", translationsAmount, displayedTranslations)}
                {renderDetails(
                    "definitions",
                    definitionsAmount,
                    displayedDefinitions,
                    !isPreview ? "ml-4 list-disc" : "",
                )}
            </div>
        </HoverBorderGradient>
    );
};
