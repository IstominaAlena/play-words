import { Response } from "express";

import { LoginUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { userTokensService } from "@/db/services/user-tokens-service";
import { usersService } from "@/db/services/users-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const signInUser = async (req: AppRequest<LoginUserDto>, res: Response) => {
    const { email: rawEmail, password } = req.body;

    const email = String(rawEmail).trim().toLowerCase();

    const user = await usersService.getUserByEmail(email);

    const isPasswordValid =
        user && (await passwordService.comparePassword(password, user?.passwordHash));

    if (!user || !isPasswordValid) {
        throw new AppError(401, messageKeys.INVALID_CREDENTIALS);
    }

    const accessToken = tokenService.generateAccessToken(user.id, user.email);

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userTokensService.createUserRefreshToken({
        userId: user.id,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);

    const safeUser = await usersService.getSafeUserById(user.id);

    res.json({ user: safeUser, accessToken });
};
