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
            <li key={item.wordId} onClick={onCardClick(item)}>
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
                <li key={i} className="min-h-60">
                    <Skeleton />
                </li>
            ));

            return (
                <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
                    {arr}
                </ul>
            );
        }

        if (!isLoading && dictionary.length === 0) {
            return <EmptyContent />;
        }

        return (
            <ul className="grid w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5">
                {dictionary.map(renderCard)}
            </ul>
        );
    }, [dictionary, isLoading, renderCard]);

    return (
        <div className="flex flex-1">
            {content}

            <Modal contentClassName="p-10" />
        </div>
    );
};
