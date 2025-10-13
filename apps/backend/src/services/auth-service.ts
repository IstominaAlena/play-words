import { CreateUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-table";
import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import {
    AppRequest,
    AuthSignupProps,
    AuthUser,
    GoogleProfile,
    PassportDone,
    StrategyReturn,
} from "@/types/common";

import { tokenService } from "./token-service";

export class AuthService {
    async signup({ email, username, provider, passwordHash, providerId }: AuthSignupProps) {
        const newUser = await usersService.createUser({
            email,
            username,
        });

        const credentialsId = await userCredentialsService.createUserCredentials({
            userId: newUser.id,
            provider,
            passwordHash,
            providerId,
        });

        if (!credentialsId) {
            await usersService.deleteUserById(newUser.id);
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        const { token, tokenHash } = tokenService.generateTokenPair();

        const refreshTokenId = await userRefreshTokenService.createRefreshToken({
            tokenHash,
            userId: newUser.id,
        });

        if (!refreshTokenId) {
            await usersService.deleteUserById(newUser.id);
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        return { user: newUser, refreshToken: token };
    }

    async signupLocal(
        req: AppRequest<CreateUserDto>,
        email: string,
        password: string,
        done: PassportDone<StrategyReturn["local-signup"]>,
    ) {
        try {
            const username = req.body.username?.trim();
            const normalizedEmail = email.trim().toLowerCase();

            const existingUser = await usersService.getUserByEmail(normalizedEmail);

            if (existingUser) {
                return done(new AppError(409, messageKeys.SIGN_UP_FAILED));
            }

            const passwordHash = await passwordService.hashPassword(password);

            const result = await this.signup({
                email: normalizedEmail,
                username,
                passwordHash,
                provider: "local",
            });

            return done(null, result);
        } catch (err) {
            return done(err);
        }
    }

    async googleAuth(
        _accessToken: string,
        _refreshToken: string,
        profile: GoogleProfile,
        done: PassportDone<StrategyReturn["google-auth"]>,
    ) {
        try {
            const email = profile.emails?.[0]?.value;
            const username = profile.displayName;
            const providerId = profile.id;

            if (!email || !username || !providerId) {
                throw new AppError(409, messageKeys.BAD_REQUEST);
            }

            const existingUser = await usersService.getUserByEmail(email);

            if (existingUser) {
                const { token, tokenHash } = tokenService.generateTokenPair();

                const refreshTokenId = await userRefreshTokenService.createRefreshToken({
                    userId: existingUser.id,
                    tokenHash,
                });

                if (!refreshTokenId) {
                    throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
                }

                const safeUser = await usersService.getSafeUser(existingUser.id);

                if (!safeUser) {
                    throw new AppError(401, messageKeys.UNAUTHORIZED);
                }

                return done(null, { user: safeUser, refreshToken: token });
            }

            const result = await this.signup({
                email,
                username,
                provider: "google",
                providerId,
            });

            return done(null, result);
        } catch (err) {
            return done(err);
        }
    }

    async signinLocal(
        email: string,
        password: string,
        done: PassportDone<StrategyReturn["local-signin"]>,
    ) {
        try {
            const normalizedEmail = email.trim().toLowerCase();

            const user = await usersService.getUserByEmail(normalizedEmail);

            if (!user) {
                throw new AppError(401, messageKeys.UNAUTHORIZED);
            }

            const userCredentials = await userCredentialsService.getCredentialsByUserId(user.id);

            if (!userCredentials || !userCredentials.passwordHash) {
                throw new AppError(401, messageKeys.UNAUTHORIZED);
            }

            const isPasswordValid = await passwordService.comparePassword(
                password,
                userCredentials.passwordHash,
            );

            if (!isPasswordValid) {
                throw new AppError(401, messageKeys.UNAUTHORIZED);
            }

            return done(null, { user });
        } catch (err) {
            done(err);
        }
    }

    async validateUser(payload: AuthUser, done: PassportDone<StrategyReturn["jwt"]>) {
        try {
            const user = await usersService.getSafeUser(payload.id);

            if (!user) return done(new AppError(401, messageKeys.UNAUTHORIZED));

            return done(null, user);
        } catch (err) {
            return done(err as Error);
        }
    }
}

export const authService = new AuthService();
