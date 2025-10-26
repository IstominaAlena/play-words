import { CreateAccountDto } from "@repo/common/types/account";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userRefreshTokenService } from "@/db/services/users/user-refresh-token-service";
import { userSettingsService } from "@/db/services/users/user-settings-service";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { hashService } from "@/services/hash-service";
import {
    AppRequest,
    AuthSignupProps,
    AuthUser,
    AuthenticatedRequest,
    GoogleProfile,
    PassportDone,
    StrategyReturn,
} from "@/types/common";

import { tokenService } from "../services/token-service";

export class AuthService {
    private async signup({
        email,
        username,
        provider,
        passwordHash,
        googleProviderId,
    }: AuthSignupProps) {
        const newUser = await usersService.createUser({
            email,
            username,
        });

        const credentialsId = await userCredentialsService.createUserCredentials({
            userId: newUser.id,
            provider,
            passwordHash,
            googleProviderId,
        });

        if (!credentialsId) {
            await usersService.deleteUser(newUser.id);

            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        const settings = await userSettingsService.createUserSettings({
            userId: newUser.id,
            google: provider === "google",
            password: !!passwordHash,
        });

        if (!settings) {
            await usersService.deleteUser(newUser.id);

            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        const { token, tokenHash } = tokenService.generateTokenPair();

        const refreshTokenId = await userRefreshTokenService.createRefreshToken({
            tokenHash,
            userId: newUser.id,
        });

        if (!refreshTokenId) {
            await usersService.deleteUser(newUser.id);

            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }

        return { user: newUser, refreshToken: token };
    }

    private async handleExistingCredentials(providerId: string) {
        const credentials =
            await userCredentialsService.getCredentialsByGoogleProviderId(providerId);

        if (!credentials) return null;

        const safeUser = await usersService.getSafeUser(credentials.userId);

        if (!safeUser) throw new AppError(401, messageKeys.UNAUTHORIZED);

        const { token, tokenHash } = tokenService.generateTokenPair();

        await userRefreshTokenService.createRefreshToken({ userId: safeUser.id, tokenHash });

        return { user: safeUser, refreshToken: token };
    }

    private async handleExistingUser(email: string, googleProviderId: string) {
        const user = await usersService.getUserByEmail(email);

        if (!user) return null;

        await userCredentialsService.createUserCredentials({
            userId: user.id,
            provider: "google",
            googleProviderId,
        });

        const safeUser = await usersService.getSafeUser(user.id);

        if (!safeUser) throw new AppError(401, messageKeys.UNAUTHORIZED);

        const { token, tokenHash } = tokenService.generateTokenPair();

        await userRefreshTokenService.createRefreshToken({ userId: safeUser.id, tokenHash });

        return { user: safeUser, refreshToken: token };
    }

    async signupLocal(
        req: AppRequest<CreateAccountDto>,
        email: string,
        password: string,
        done: PassportDone<StrategyReturn["local-signup"]>,
    ) {
        try {
            const username = req.body.username?.trim();
            const normalizedEmail = email.trim().toLowerCase();

            const existingUser = await usersService.getUserByEmail(normalizedEmail);

            if (existingUser) {
                throw new AppError(409, messageKeys.SIGN_UP_FAILED);
            }

            const passwordHash = await hashService.hash(password);

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

            const isPasswordValid = await hashService.compareHash(
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

    async googleAuth(
        _accessToken: string,
        _refreshToken: string,
        profile: GoogleProfile,
        done: PassportDone<StrategyReturn["google-auth"]>,
    ) {
        try {
            const email = profile.emails?.[0]?.value;
            const username = profile.displayName;
            const googleProviderId = profile.id;

            if (!email || !username || !googleProviderId) {
                throw new AppError(409, messageKeys.BAD_REQUEST);
            }

            const result = await this.handleExistingCredentials(googleProviderId);
            if (result) return done(null, result);

            const connectedResult = await this.handleExistingUser(email, googleProviderId);
            if (connectedResult) return done(null, connectedResult);

            const newUserResult = await this.signup({
                email,
                username,
                provider: "google",
                googleProviderId,
            });

            return done(null, newUserResult);
        } catch (err) {
            return done(err);
        }
    }

    async connectGoogleAccount(
        req: AppRequest,
        _accessToken: string,
        _refreshToken: string,
        profile: GoogleProfile,
        done: PassportDone<StrategyReturn["connect-google"]>,
    ) {
        try {
            const authReq = req as AuthenticatedRequest;
            const user = authReq.user;

            if (!user) {
                throw new AppError(401, messageKeys.UNAUTHORIZED);
            }

            const email = profile.emails?.[0]?.value;
            const username = profile.displayName;
            const googleProviderId = profile.id;

            if (!email || !username || !googleProviderId) {
                throw new AppError(409, messageKeys.BAD_REQUEST);
            }

            const credentialsId = await userCredentialsService.updateUserCredentials(user.id, {
                googleProviderId,
            });

            if (!credentialsId) {
                throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
            }

            const settings = await userSettingsService.updateUserSettings(user.id, {
                google: true,
            });

            if (!settings) {
                throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
            }

            return done(null, { settings });
        } catch (err) {
            return done(err);
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
