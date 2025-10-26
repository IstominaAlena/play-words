import { NextFunction, Request, Response } from "express";
import { IVerifyOptions } from "passport-local";

import { Account } from "@repo/common/types/account";

import defaultLang from "../messages/en.json";
import { UserSettingsTable, UsersTable } from "./users";

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
    "local-signup": { user: Account; refreshToken: string };
    "google-auth": { user: Account; refreshToken: string };
    "local-signin": { user: Account };
    jwt: AuthUser;
    "connect-google": {
        settings: Pick<UserSettingsTable, "verified" | "google" | "otp" | "password">;
    };
};

export type PassportDone<T> = (
    error: unknown,
    user?: false | T | undefined,
    options?: IVerifyOptions,
) => void;

export interface AuthSignupProps {
    email: string;
    username: string;
    provider: "local" | "google";
    passwordHash?: string;
    googleProviderId?: string;
}

export interface GoogleProfile {
    id: string;
    displayName: string;
    emails?: { value: string }[];
}

export interface ResetPassword {
    token: string;
    password: string;
}
