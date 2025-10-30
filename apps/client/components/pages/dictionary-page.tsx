"use client";

import { ChangeEvent, FC, useMemo, useState } from "react";

import { Meteors } from "@repo/ui/core/meteors";

import { DEBOUNCE_DELAY, DEFAULT_ITEMS_PER_PAGE } from "@repo/common/constants/common";
import useDebounce from "@repo/common/hooks/use-debounce.ts";
import useWindowDimensions from "@repo/common/hooks/use-window-dimensions.ts";

import { useDictionary } from "@/api/dictionary/queries";

import { DictionaryBar } from "../dictionary/dictionary-bar";
import { DictionaryTable } from "../dictionary/dictionary-table";

export const DictionaryPage: FC = () => {
    const { isMd } = useWindowDimensions();

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

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

    const searchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    return (
        <section className="relative flex flex-1 flex-col overflow-hidden py-10 md:py-6">
            <Meteors number={10} containerWidth={isMd ? 800 : 2500} />

            <div className="relative container flex w-full flex-1 flex-col gap-6 md:gap-4">
                <DictionaryBar search={search} searchChange={searchChange} />

                <DictionaryTable dictionary={dictionary} />
            </div>
        </section>
    );
};
