import { NextFunction, Response } from "express";
import passportStrategy from "passport-strategies/user-passport-strategies";

import { messageKeys } from "@/constants/common";
import { AppError } from "@/services/error-service";
import { AppRequest, StrategyReturn } from "@/types/common";

export const passportControllerWrapper = <
    TBody = object,
    TStrategy extends keyof StrategyReturn = keyof StrategyReturn,
>(
    strategy: TStrategy,
    options?: object,
) => {
    return async (
        req: AppRequest<TBody>,
        res: Response<any, Record<string, any>>,
        next: NextFunction,
    ): Promise<StrategyReturn[TStrategy]> => {
        return new Promise<StrategyReturn[TStrategy]>((resolve, reject) => {
            passportStrategy.authenticate(
                strategy,
                options || {},
                (
                    err: Error | null,
                    user: StrategyReturn[TStrategy] | false,
                    info?: { message?: string },
                ) => {
                    if (err) return reject(err);
                    if (!user)
                        return reject(
                            new AppError(
                                401,
                                info?.message ? undefined : messageKeys.UNAUTHORIZED,
                                info?.message,
                            ),
                        );
                    resolve(user);
                },
            )(req, res, next);
        });
    };
};
