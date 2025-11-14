"use client";

import { useTranslations } from "next-intl";
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from "react";

import { EmptyContent } from "@repo/ui/components/empty-content";
import { Checkbox } from "@repo/ui/core/checkbox";
import { Input } from "@repo/ui/core/input";
import { Pagination } from "@repo/ui/core/pagination";
import { Skeleton } from "@repo/ui/core/skeleton";
import { Text, Title } from "@repo/ui/core/typography";

import {
    DEBOUNCE_DELAY,
    DEFAULT_ITEMS_PER_PAGE,
    DEFAULT_WORDS_PER_TRAINING,
} from "@repo/common/constants/common";
import useDebounce from "@repo/common/hooks/use-debounce.ts";
import { useUserStore } from "@repo/common/stores/user-store";
import { Word } from "@repo/common/types/dictionary";

import { useDemoDictionary, useDictionary } from "@/api/dictionary/queries";

export const WordsPicker: FC = () => {
    const t = useTranslations("practice");
    const tForm = useTranslations("form");

    const [random, setRandom] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data: demoDictionaryData, isPending: demoDictionaryPending } = useDemoDictionary();

    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

    const { data: dictionaryData, isPending } = useDictionary(
        DEFAULT_ITEMS_PER_PAGE,
        page,
        debouncedSearch,
    );

    const { user, settings, practiceWordsIds, setPracticeWordsIds, clearPracticeWordsIds } =
        useUserStore();

    const wordsPerTraining = settings?.wordsPerTraining ?? DEFAULT_WORDS_PER_TRAINING;

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

    const onWordClick = useCallback(
        (wordId: number) => () => {
            if (random) {
                setRandom(false);
            }
            setPracticeWordsIds([...practiceWordsIds, wordId]);
        },
        [practiceWordsIds, random, setPracticeWordsIds],
    );

    const onRandomChange = useCallback(() => {
        setRandom(true);
        clearPracticeWordsIds();
    }, [clearPracticeWordsIds]);

    const renderWordItem = useCallback(
        ({ wordId, word }: Word) => (
            <li key={wordId}>
                <Checkbox
                    onCheckedChange={onWordClick(wordId)}
                    checked={practiceWordsIds.includes(wordId)}
                    labelClassName="text-xl"
                    label={word}
                    disabled={practiceWordsIds.length === wordsPerTraining}
                />
            </li>
        ),
        [onWordClick, practiceWordsIds, wordsPerTraining],
    );

    const content = useMemo(() => {
        if (isLoading) {
            const arr = Array.from({ length: DEFAULT_ITEMS_PER_PAGE + 1 }, (_, i) => (
                <li key={i}>
                    <Skeleton className="h-7" />
                </li>
            ));

            return <ul className="flex w-full flex-col gap-4">{arr}</ul>;
        }

        if (!isLoading && dictionary.length === 0) {
            return <EmptyContent />;
        }

        return (
            <ul className="flex w-full flex-col gap-4">
                <li>
                    <Checkbox
                        checked={random}
                        onCheckedChange={onRandomChange}
                        labelClassName="text-xl"
                        label={t("random_words", {
                            number: wordsPerTraining,
                        })}
                    />
                </li>
                {dictionary.map(renderWordItem)}
            </ul>
        );
    }, [dictionary, isLoading, onRandomChange, random, renderWordItem, t, wordsPerTraining]);

    return (
        <div className="flex w-full max-w-sm flex-1 flex-col gap-4">
            <div className="flex flex-col gap-1">
                <Title>{t("words")}</Title>
                <Text>
                    {t("words_description", {
                        number: wordsPerTraining,
                    })}
                </Text>
            </div>
            <Input
                placeholder={tForm("search")}
                type="text"
                value={search}
                onChange={searchChange}
                className="bg-secondary_bg"
            />
            {content}
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
    );
};
