import { NextFunction, Response } from "express";

import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppRequest } from "@/types/common";

export const authValidation = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const user = await passportControllerWrapper("jwt", { session: false })(req, res, next);

        req.user = user;
        next();
    } catch (error: unknown) {
        next(error);
    }
};
