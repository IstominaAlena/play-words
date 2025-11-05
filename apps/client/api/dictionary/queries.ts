"use client";

import { useApiQuery } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { Dictionary, WordInfo } from "@repo/common/types/dictionary";

import { getDictionary, getWordInfo } from "./endpoints";

export const useDictionary = (pageSize: number, page: number, search: string) => {
    const { user } = useUserStore();

    return useApiQuery<Dictionary>({
        retry: false,
        queryFn: () => getDictionary({ pageSize, page, search }),
        queryKey: ["dictionary", pageSize, page, search],
        enabled: !!user,
    });
};

export const useWordInfo = (word: string) => {
    const { user } = useUserStore();

    return useApiQuery<WordInfo>({
        retry: false,
        queryFn: () => getWordInfo(word),
        queryKey: ["word-info", word],
        enabled: !!user && !!word,
    });
};
