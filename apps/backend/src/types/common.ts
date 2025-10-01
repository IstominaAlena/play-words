import { NextFunction, Request, Response } from "express";

import defaultLang from "../messages/en.json";

export type Messages = typeof defaultLang;

export type AppError = Error & {
    statusCode?: number;
    messageKey?: keyof Messages;
    message?: string;
};

export type AppRequest<TBody = object, TQuery = object, TParams = object> = Request<
    TParams,
    any,
    TBody,
    TQuery
>;

export type AsyncController<TBody = object, TResBody = any> = (
    req: AppRequest<TBody>,
    res: Response<TResBody>,
    next: NextFunction,
) => Promise<any>;
