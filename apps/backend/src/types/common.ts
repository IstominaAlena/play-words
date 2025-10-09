import { NextFunction, Request, Response } from "express";
import { IVerifyOptions } from "passport-local";

import { User } from "@repo/common/types/users";

import defaultLang from "../messages/en.json";
import { UsersTable } from "./users";

export type Messages = typeof defaultLang;

export interface AuthUser {
    id: UsersTable["id"];
    email: UsersTable["email"];
}

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

export type AuthenticatedRequest<TBody = object> = AppRequest<TBody> & { user: AuthUser };

export type AsyncController<TReq extends AppRequest = AppRequest, TResBody = any> = (
    req: TReq,
    res: Response<TResBody>,
    next: NextFunction,
) => Promise<any>;

export type StrategyReturn = {
    signin: User;
    signup: { newUser: User; refreshToken: string };
    jwt: AuthUser;
};

export type PassportDone<T> = (
    error: unknown,
    user?: false | T | undefined,
    options?: IVerifyOptions,
) => void;
