import { NextFunction, Response } from "express";

import { messageKeys } from "@/constants/common";
import { AppError } from "@/services/error-service";
import { AppRequest } from "@/types/common";

import { passportControllerWrapper } from "./passport-wrapper";

export const authValidation = async (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }

        req.headers.authorization = `Bearer ${token}`;

        const user = await passportControllerWrapper("jwt", { session: false })(req, res, next);

        req.user = user;
        next();
    } catch (error: unknown) {
        next(error);
    }
};
