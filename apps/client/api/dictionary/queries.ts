"use client";

import { useApiQuery } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { Dictionary } from "@repo/common/types/dictionary";

import { getDictionary } from "./endpoints";

export const useDictionary = (pageSize: number, page: number) => {
    const { user } = useUserStore();

    return useApiQuery<Dictionary>({
        retry: false,
        queryFn: () => getDictionary({ pageSize, page }),
        queryKey: ["dictionary", pageSize, page],
        enabled: !!user,
    });
};
