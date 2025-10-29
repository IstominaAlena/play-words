import { Response } from "express";

import { PaginationDto } from "@repo/common/types/api";

import { messageKeys } from "@/constants/common";
import { dictionaryService } from "@/db/services/dictionary/dictionary-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const getDictionary = async (
    req: AuthenticatedRequest<object, PaginationDto>,
    res: Response,
) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const { limit, offset } = req.query;

    const dictionary = await dictionaryService.getDictionary(userId, limit, offset);

    return res.status(200).json(dictionary);
};
