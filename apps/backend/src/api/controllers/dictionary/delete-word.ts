import { Response } from "express";

import { DeleteWordDto } from "@repo/common/types/api";

import { messageKeys } from "@/constants/common";
import { dictionaryService } from "@/db/services/dictionary/dictionary-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const deleteWord = async (
    req: AuthenticatedRequest<object, DeleteWordDto>,
    res: Response,
) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const wordId = Number(req.query.wordId);

    if (!wordId || isNaN(wordId)) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    await dictionaryService.deleteDictionaryRowsByWordId(userId, wordId);

    return res.status(204).end();
};
