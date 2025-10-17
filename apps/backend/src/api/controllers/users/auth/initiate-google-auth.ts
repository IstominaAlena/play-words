import { RequestHandler } from "express";
import passportStrategy from "passport-strategies/user-passport-strategies";

export const initiateGoogleAuth: RequestHandler = (req, res, next) => {
    passportStrategy.authenticate("google-auth", {
        scope: ["profile", "email"],
        session: false,
    })(req, res, next);
};
