import { Response } from "express";

import { UpdateUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

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

    const { email: rawEmail, username: rawUsername } = req.body;

    const updateData: UpdateUserDto = {};

    if (rawEmail) updateData.email = rawEmail.trim().toLowerCase();
    if (rawUsername) updateData.username = rawUsername.trim();

    if (Object.keys(updateData).length === 0) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const safeUser = await usersService.updateUser(currentUser.id, updateData);

    res.json({ user: safeUser });
};
