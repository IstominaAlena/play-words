"use client";

import { queryClient, useApiMutation } from "@repo/api-config/api-config";
import { CreateWordDto } from "@repo/common/types/dictionary";

import { addWord, deleteWord } from "./endpoints";

export const useAddWord = () => {
    return useApiMutation<void, CreateWordDto>({
        retry: false,
        mutationFn: addWord,
        mutationKey: ["add-word"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dictionary"], exact: false });
        },
    });
};

export const useDeleteWord = () => {
    return useApiMutation<void, number>({
        retry: false,
        mutationFn: deleteWord,
        mutationKey: ["delete-word"],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dictionary"], exact: false });
        },
    });
};
