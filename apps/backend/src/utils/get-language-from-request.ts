import { AppRequest } from "@/types/common";

export const getLanguageFromRequest = <
    TBody = unknown,
    TQuery = unknown,
    TParams = Record<string, never>,
>(
    req: AppRequest<TBody, TQuery, TParams>,
) => req.headers["accept-language"]?.toString();
