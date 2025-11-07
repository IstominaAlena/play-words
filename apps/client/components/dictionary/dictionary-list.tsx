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

    const renderCard = useCallback(
        (item: Word) => (
            <li key={item.wordId} className="max-h-40 flex-1 md:max-h-80">
                <DictionaryCard
                    data={item}
                    isPreview
                    openModal={openModal}
                    closeModal={closeModal}
                />
            </li>
        ),
        [closeModal, openModal],
    );

    const content = useMemo(() => {
        if (isLoading) {
            const arr = Array.from({ length: DEFAULT_ITEMS_PER_PAGE }, (_, i) => (
                <li key={i} className="min-h-20 flex-1">
                    <Skeleton />
                </li>
            ));

            return <ul className="flex w-full flex-col gap-4">{arr}</ul>;
        }

        if (!isLoading && dictionary.length === 0) {
            return <EmptyContent />;
        }

        return <ul className="flex w-full flex-col gap-4">{dictionary.map(renderCard)}</ul>;
    }, [dictionary, isLoading, renderCard]);

    return (
        <div className="flex flex-1">
            {content}

            <Modal contentClassName="p-3" />
        </div>
    );
};
