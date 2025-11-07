"use client";

import { useTranslations } from "next-intl";
import { ChangeEvent, FC, useEffect, useState } from "react";

import { Skeleton } from "@repo/ui/core/skeleton";
import { Title } from "@repo/ui/core/typography";

import { DictionaryBar } from "./dictionary-bar";

interface Props {
    showDemo: boolean;
    search: string;
    searchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DictionaryHeader: FC<Props> = ({ showDemo, search, searchChange }) => {
    const tGlobal = useTranslations("global");

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div className="flex items-center justify-between gap-6 sm:flex-col">
                <Skeleton className="h-10 w-sm rounded-full sm:w-full" />
                <Skeleton className="w-default! h-10 rounded-full sm:w-full" />
            </div>
        );
    }

    return showDemo ? (
        <Title className="text-center">{tGlobal("demo_title")}</Title>
    ) : (
        <DictionaryBar search={search} searchChange={searchChange} />
    );
};
