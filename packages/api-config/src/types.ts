import { MutationFunction, MutationKey, QueryFunction, QueryKey } from "@tanstack/react-query";

export interface ApiQueryProps<TData = unknown> {
    queryFn: QueryFunction<TData>;
    queryKey: QueryKey;
    retry?: boolean;
    enabled?: boolean;
}

export interface ApiMutationProps<TData = unknown, TVariables = void> {
    mutationFn?: MutationFunction<TData, TVariables>;
    onSuccess?: (response?: TData) => void | Promise<void>;
    onMutate?: () => void;
    onSettled?: () => void;
    onError?: () => void;
    mutationKey?: MutationKey;
    retry?: boolean;
}
