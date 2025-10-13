import { NextFunction, Response } from "express";

import passportService from "@/services/passport-service";
import { AppRequest } from "@/types/common";

export const initiateGoogleAuth = (req: AppRequest, res: Response, next: NextFunction) =>
    passportService.authenticate("google-auth", { scope: ["profile", "email"], session: false })(
        req,
        res,
        next,
    );
