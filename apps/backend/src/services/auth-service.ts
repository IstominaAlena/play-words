import { CreateUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import { AppRequest, AuthUser, PassportDone, StrategyReturn } from "@/types/common";

export class AuthService {
    async signup(
        req: AppRequest<CreateUserDto>,
        email: string,
        password: string,
        done: PassportDone<StrategyReturn["signup"]>,
    ) {
        try {
            const username = req.body.username?.trim();
            const normalizedEmail = email.trim().toLowerCase();

            const existingUser = await usersService.getUserByEmail(normalizedEmail);
            if (existingUser) {
                return done(new AppError(409, messageKeys.ALREADY_EXISTS));
            }

            const passwordHash = await passwordService.hashPassword(password);

            const { newUser, refreshToken } = await usersService.createUser({
                email: normalizedEmail,
                username,
                passwordHash,
            });

            return done(null, { newUser, refreshToken });
        } catch (err) {
            return done(err);
        }
    }

    async signin(email: string, password: string, done: PassportDone<StrategyReturn["signin"]>) {
        try {
            const normalizedEmail = email.trim().toLowerCase();
            const user = await usersService.getUserByEmail(normalizedEmail);

            if (!user) return done(new AppError(401, messageKeys.UNAUTHORIZED));
            const isPasswordValid = await passwordService.comparePassword(
                password,
                user.passwordHash,
            );
            if (!isPasswordValid) return done(new AppError(401, messageKeys.UNAUTHORIZED));

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }

    async validateUser(payload: AuthUser, done: PassportDone<StrategyReturn["jwt"]>) {
        try {
            const user = await usersService.getSafeUserById(payload.id);

            if (!user) return done(new AppError(401, messageKeys.UNAUTHORIZED));

            return done(null, user);
        } catch (err) {
            return done(err as Error);
        }
    }
}

export const authService = new AuthService();
