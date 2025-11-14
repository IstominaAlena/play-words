"use client";

import { ChangeEvent, FC, useMemo, useState } from "react";

import { Pagination } from "@repo/ui/core/pagination";

import { DEBOUNCE_DELAY, DEFAULT_ITEMS_PER_PAGE } from "@repo/common/constants/common";
import useDebounce from "@repo/common/hooks/use-debounce.ts";
import { useUserStore } from "@repo/common/stores/user-store";

import { useDemoDictionary, useDictionary } from "@/api/dictionary/queries";

import { DictionaryHeader } from "../dictionary/dictionary-header";
import { DictionaryList } from "../dictionary/dictionary-list";

export const DictionaryPage: FC = () => {
    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

    const { user } = useUserStore();

    const { data: demoDictionaryData, isPending: demoDictionaryPending } = useDemoDictionary();

    const { data: dictionaryData, isPending } = useDictionary(
        DEFAULT_ITEMS_PER_PAGE,
        page,
        debouncedSearch,
    );

    const isLoading = user ? isPending : demoDictionaryPending;

    const dictionary = useMemo(
        () => (dictionaryData?.data || demoDictionaryData?.data) ?? [],
        [demoDictionaryData?.data, dictionaryData?.data],
    );
    const totalPages = useMemo(
        () => (dictionaryData?.pages || demoDictionaryData?.pages) ?? 0,
        [demoDictionaryData?.pages, dictionaryData?.pages],
    );

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
            <div className="relative container flex w-full flex-1 flex-col gap-6 md:gap-4">
                <DictionaryHeader showDemo={!user} search={search} searchChange={searchChange} />

                <div className="bg-secondary_bg/80 relative container flex w-full flex-1 flex-col gap-6 rounded-lg p-6 md:p-4">
                    <DictionaryList dictionary={dictionary} isLoading={isLoading} />
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        hasNextPage={hasNextPage}
                        hasPreviousPage={hasPrevPage}
                        fetchNextPage={fetchNextPage}
                        fetchPreviousPage={fetchPrevPage}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </section>
    );
};
