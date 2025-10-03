import { NextFunction, Response } from "express";

import { messageKeys } from "@/constants/common";
import { AppError } from "@/services/error-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const authValidation = (req: AppRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(401, messageKeys.UNAUTHORIZED);
        }

        const token = authHeader.split(" ")[1];

        const payload = tokenService.verifyAccessToken(token);

        req.user = {
            id: payload.id,
            email: payload.email,
        };

        next();
    } catch (error: unknown) {
        next(error);
    }
};
