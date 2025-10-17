import * as passportStrategy from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";

import {
    BASE_API_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    JWT_SECRET,
} from "@/constants/common";

import { authService } from "./user-auth-service";

passportStrategy.use(
    "local-signup",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        authService.signupLocal.bind(authService),
    ),
);

passportStrategy.use(
    "local-signin",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: false,
        },
        authService.signinLocal.bind(authService),
    ),
);

passportStrategy.use(
    "google-auth",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${BASE_API_URL}/api/users/google/callback`,
            scope: ["profile", "email"],
            passReqToCallback: false,
        },
        authService.googleAuth.bind(authService),
    ),
);

passportStrategy.use(
    "connect-google",
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: `${BASE_API_URL}/api/users/google/connect/callback`,
            scope: ["profile", "email"],
            passReqToCallback: true,
        },
        authService.connectGoogleAccount.bind(authService),
    ),
);

passportStrategy.use(
    "jwt",
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        },
        authService.validateUser,
    ),
);

export default passportStrategy;
