"use client";

import { ChangeEvent, FC, useMemo, useState } from "react";

import { GlowingStarsBackground } from "@repo/ui/core/glowing-starts";
import { Pagination } from "@repo/ui/core/pagination";

import { DEBOUNCE_DELAY, DEFAULT_ITEMS_PER_PAGE } from "@repo/common/constants/common";
import useDebounce from "@repo/common/hooks/use-debounce.ts";

import { useDictionary } from "@/api/dictionary/queries";

import { DictionaryBar } from "../dictionary/dictionary-bar";
import { DictionaryList } from "../dictionary/dictionary-list";

export const DictionaryPage: FC = () => {
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

    const { data: dictionaryData, isPending } = useDictionary(
        DEFAULT_ITEMS_PER_PAGE,
        page,
        debouncedSearch,
    );

    const dictionary = useMemo(() => dictionaryData?.data ?? [], [dictionaryData?.data]);
    const totalPages = useMemo(() => dictionaryData?.pages ?? 0, [dictionaryData?.pages]);

    const hasNextPage = useMemo(() => page < totalPages, [page, totalPages]);
    const hasPrevPage = useMemo(() => page > 1, [page]);

    const searchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const fetchNextPage = () => {
        if (hasNextPage) {
            setPage((prev) => prev + 1);
        }
    };

    const fetchPrevPage = () => {
        if (hasPrevPage) {
            setPage((prev) => prev - 1);
        }
    };

    return (
        <section className="relative flex flex-1 flex-col overflow-hidden py-10 md:py-6">
            <GlowingStarsBackground />

            <div className="relative container flex w-full flex-1 flex-col gap-6 md:gap-4">
                <DictionaryBar search={search} searchChange={searchChange} />

                <div className="bg-secondary_dark/80 relative container flex w-full flex-1 flex-col rounded-lg p-6 md:p-4">
                    <DictionaryList dictionary={dictionary} isLoading={isPending} />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPrevPage}
                        fetchNextPage={fetchNextPage}
                        fetchPreviousPage={fetchPrevPage}
                        isLoading={isPending}
                    />
                </div>
            </div>
        </section>
    );
};
