import { NextFunction, RequestHandler, Response } from "express";

import { AppRequest, AsyncController } from "@/types/common";

export const controllerWrapper = <TReq extends AppRequest = AppRequest, TResBody = any>(
    controller: AsyncController<TReq, TResBody>,
): RequestHandler => {
    return (async (req: AppRequest, res: Response, next: NextFunction) => {
        try {
            await controller(req as TReq, res, next);
        } catch (error: unknown) {
            next(error);
        }
    }) as RequestHandler;
};
