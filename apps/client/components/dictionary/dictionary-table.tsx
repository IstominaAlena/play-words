"use client";

import { FC, useMemo } from "react";

import { EmptyContent } from "@repo/ui/components/empty-content";

import { DEFAULT_ITEMS_PER_PAGE } from "@repo/common/constants/common";

import { useDictionary } from "@/api/dictionary/queries";

export const DictionaryTable: FC = () => {
    const {
        data: dictionaryData,
        fetchNextPage,
        fetchPreviousPage,
    } = useDictionary(DEFAULT_ITEMS_PER_PAGE);

    const dictionaryPages = useMemo(() => dictionaryData?.pages ?? [], [dictionaryData]);

    const dictionary = useMemo(
        () => dictionaryPages.map((page) => page.data).flat(),
        [dictionaryPages],
    );

    console.log("==========>>>", { dictionary });

    if (dictionary.length === 0) {
        return <EmptyContent />;
    }

    return <>Dictionary</>;
};
