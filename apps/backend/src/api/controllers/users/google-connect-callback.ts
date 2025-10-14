import { NextFunction, Response } from "express";

import { messageKeys } from "@/constants/common";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { AppRequest } from "@/types/common";

export const googleConnectCallback = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const result = await passportControllerWrapper("connect-google", {
            session: false,
        })(req, res, next);

        if (!result || !result.settings) {
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        res.json({ settings: result.settings });
    } catch (err) {
        next(err);
    }
};
