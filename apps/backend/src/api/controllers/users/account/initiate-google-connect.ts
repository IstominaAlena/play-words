import { RequestHandler } from "express";
import passportStrategy from "passport-strategies/user-passport-strategies";

export const initiateGoogleConnect: RequestHandler = (req, res, next) => {
    passportStrategy.authenticate("connect-google", {
        scope: ["profile", "email"],
        session: false,
    })(req, res, next);
};
