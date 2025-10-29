"use client";

import { useApiInfiniteQuery } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { Dictionary } from "@repo/common/types/dictionary";

import { getDictionary } from "./endpoints";

export const useDictionary = (limit: number) => {
    const { user } = useUserStore();

    return useApiInfiniteQuery<Dictionary>({
        retry: false,
        queryFn: ({ pageParam = 1 }) => getDictionary({ limit, offset: pageParam as number }),
        queryKey: ["dictionary", limit],
        getNextPageParam: (lastPage) => (lastPage.page < lastPage.pages ? lastPage.page + 1 : null),
        enabled: !!user,
    });
};
