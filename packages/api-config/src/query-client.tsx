"use client";

import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC, PropsWithChildren, useEffect, useState } from "react";

import { useLoaderStore } from "@repo/common/stores/loader-store";
import { ErrorResponse } from "@repo/common/types/users";

import { ApiMutationProps, ApiQueryProps } from "./types";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: 1,
        },
        mutations: {
            retry: false,
        },
    },
});

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const useApiQuery = <TData,>({
    queryFn,
    queryKey,
    retry = false,
    enabled = true,
}: ApiQueryProps<TData>) => {
    const { startLoader, stopLoader } = useLoaderStore();

    const query = useQuery<TData, unknown>({
        retry,
        queryFn,
        queryKey,
        enabled,
    });

    useEffect(() => {
        if (query.isLoading) {
            startLoader();
        } else {
            stopLoader();
        }
        return () => {
            stopLoader();
        };
    }, [query.isLoading, startLoader, stopLoader]);

    return query;
};

export const useApiMutation = <TData, TVariable>({
    mutationFn,
    mutationKey,
    retry = false,
    onSuccess,
    onMutate,
    onSettled,
    onError,
}: ApiMutationProps<TData, TVariable>) => {
    const { startLoader, stopLoader } = useLoaderStore();

    const mutation = useMutation({
        retry,
        mutationFn,
        mutationKey,
        onSuccess,
        onMutate: () => {
            startLoader();
            onMutate?.();
        },
        onSettled: () => {
            stopLoader();
            onSettled?.();
        },
        onError: (error) => {
            onError?.();

            const e = error as AxiosError<ErrorResponse>;
            const message =
                e.response?.data?.message ||
                JSON.stringify(e.response?.data) ||
                e.message ||
                "Unknown error";

            throw new Error(message);
        },
    });

    return mutation;
};
