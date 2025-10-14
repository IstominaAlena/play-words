import { NextFunction, Response } from "express";

import { BASE_CLIENT_URL, messageKeys } from "@/constants/common";
import { passportControllerWrapper } from "@/middlewares/passport-wrapper";
import { AppError } from "@/services/error-service";
import { AppRequest } from "@/types/common";

export const googleConnectCallback = async (req: AppRequest, res: Response, next: NextFunction) => {
    const result = await passportControllerWrapper("connect-google", {
        session: false,
    })(req, res, next);

    if (!result || !result.settings) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.redirect(`${BASE_CLIENT_URL}/auth/success`);
};
