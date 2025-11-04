import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { wordsService } from "@/db/services/dictionary/words-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const getWordInfo = async (req: AuthenticatedRequest<{ word: string }>, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const { word } = req.body;

    if (!word) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const wordInfo = await wordsService.getWordByValue(word);

    return res.status(200).json(wordInfo);
};
