import { Response } from "express";

import { UpdateUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users-service";
import { AppError } from "@/services/error-service";
import { passwordService } from "@/services/password-service";
import { AuthenticatedRequest } from "@/types/common";
import { UpdateUser } from "@/types/users";

export const updateCurrentUser = async (
    req: AuthenticatedRequest<UpdateUserDto>,
    res: Response,
) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const currentUser = await usersService.getSafeUserById(userId);

    if (!currentUser) {
        throw new AppError(404, messageKeys.NOT_FOUND);
    }

    const { email: rawEmail, username: rawUsername, password } = req.body;

    const updateData: UpdateUser = {};

    if (rawEmail) updateData.email = rawEmail.trim().toLowerCase();
    if (rawUsername) updateData.username = rawUsername.trim();
    if (password) updateData.passwordHash = await passwordService.hashPassword(password);

    if (Object.keys(updateData).length === 0) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const safeUser = await usersService.updateUser(currentUser.id, updateData);

    res.json({ user: safeUser });
};
