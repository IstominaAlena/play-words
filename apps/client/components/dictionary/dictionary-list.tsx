"use client";

import { FC, useCallback, useMemo } from "react";

import { EmptyContent } from "@repo/ui/components/empty-content";
import { Skeleton } from "@repo/ui/core/skeleton";

import { DEFAULT_ITEMS_PER_PAGE } from "@repo/common/constants/common";
import { useModal } from "@repo/common/hooks/use-modal.tsx";
import { Word } from "@repo/common/types/dictionary";

import { DictionaryCard } from "./dictionary-card";

interface Props {
    dictionary: Word[];
    isLoading?: boolean;
}

export const DictionaryList: FC<Props> = ({ dictionary, isLoading }) => {
    const { Modal, openModal, closeModal } = useModal();

    const onCardClick = useCallback(
        (item: Word) => () =>
            openModal(
                <DictionaryCard
                    id={item.wordId}
                    word={item.word}
                    translations={item.translations}
                    definitions={item.definitions}
                    openModal={openModal}
                    closeModal={closeModal}
                />,
            ),
        [closeModal, openModal],
    );

    const renderCard = useCallback(
        (item: Word) => (
            <li
                key={item.wordId}
                className="w-full max-w-[calc(100%/5-20px)]"
                onClick={onCardClick(item)}
            >
                <DictionaryCard
                    id={item.wordId}
                    word={item.word}
                    translations={item.translations}
                    definitions={item.definitions}
                    isPreview
                    openModal={openModal}
                    closeModal={closeModal}
                />
            </li>
        ),
        [closeModal, onCardClick, openModal],
    );

    const content = useMemo(() => {
        if (isLoading) {
            const arr = Array.from({ length: DEFAULT_ITEMS_PER_PAGE }, (_, i) => (
                <li key={i} className="w-full max-w-[calc(100%/5-20px)]">
                    <Skeleton />
                </li>
            ));

            return <ul className="flex w-full flex-1 flex-wrap justify-between gap-4">{arr}</ul>;
        }

        if (!isLoading && dictionary.length === 0) {
            return <EmptyContent />;
        }

        return (
            <ul className="flex flex-wrap justify-between gap-4">{dictionary.map(renderCard)}</ul>
        );
    }, [dictionary, isLoading, renderCard]);

    return (
        <div className="flex flex-1">
            {content}

            <Modal contentClassName="p-10" />
        </div>
    );
};
