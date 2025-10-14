import { RequestHandler } from "express";

import passportService from "@/services/passport-service";

export const initiateGoogleConnect: RequestHandler = (req, res, next) => {
    passportService.authenticate("connect-google", {
        scope: ["profile", "email"],
        session: false,
    })(req, res, next);
};
