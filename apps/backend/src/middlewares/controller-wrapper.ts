import { NextFunction, Request, Response } from "express";

type Controller = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const controllerWrapper = (controller: Controller) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res, next);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // TODO: figure out how to handle errors here and what exactly
            next(error);
        }
    };
};
