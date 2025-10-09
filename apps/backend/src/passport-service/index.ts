import * as passportService from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import { JWT_SECRET } from "@/constants/common";

import { authService } from "./auth-service";

passportService.use(
    "signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        (req, username, password, done) => authService.signup(req, username, password, done),
    ),
);

passportService.use(
    "signin",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: false,
        },
        (email, password, done) => authService.signin(email, password, done),
    ),
);

passportService.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        async (payload, done) => authService.validateUser(payload, done),
    ),
);

export default passportService;
