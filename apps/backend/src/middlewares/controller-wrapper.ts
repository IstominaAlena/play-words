import { NextFunction, Response } from "express";

import { AppRequest, AsyncController } from "@/types/common";

export const controllerWrapper = <TBody = object, TResBody = any>(
    controller: AsyncController<TBody>,
) => {
    return async (req: AppRequest<TBody>, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
        } catch (error: unknown) {
            next(error);
        }
    };
};
