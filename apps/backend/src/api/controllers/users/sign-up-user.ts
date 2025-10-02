import { Response } from "express";

import { CreateUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users-service";
import { passwordService } from "@/services/password-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const signUpUser = async (req: AppRequest<CreateUserDto>, res: Response) => {
    const { email: rawEmail, username: rawUsername, password } = req.body;

    const email = String(rawEmail).trim().toLowerCase();
    const username = rawUsername.trim();

    const existingUser = await usersService.getUserByEmail(email);

    if (existingUser?.id) {
        throw { statusCode: 404, messageKey: messageKeys.ALREADY_EXISTS };
    }

    const passwordHash = await passwordService.hashPassword(password);

    const { newUser, refreshToken } = await usersService.createUser({
        email,
        username,
        passwordHash,
    });

    const accessToken = tokenService.generateAccessToken(newUser.id, newUser.email);

    tokenService.setRefreshTokenCookie(res, refreshToken);

    res.json({ user: newUser, accessToken });
};
