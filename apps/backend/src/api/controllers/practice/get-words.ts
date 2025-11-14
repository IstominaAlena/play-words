import { Response } from "express";

import { DEFAULT_WORDS_PER_TRAINING } from "@repo/common/constants/common";

import { messageKeys } from "@/constants/common";
import { dictionaryService } from "@/db/services/dictionary/dictionary-service";
import { userSettingsService } from "@/db/services/users/user-settings-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const getWords = async (req: AuthenticatedRequest<{ ids?: number[] }>, res: Response) => {
    const userId = req.user.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const { ids } = req.body as { ids?: number[] };

    let wordsIds: number[];

    if (ids && ids.length > 0) {
        wordsIds = ids;
    } else {
        const rawDictionary = await dictionaryService.getRawDictionaryByUserId(userId);

        const settings = await userSettingsService.getSettingsByUserId(userId);

        const wordsPerTraining = settings?.wordsPerTraining ?? DEFAULT_WORDS_PER_TRAINING;

        wordsIds = rawDictionary
            .sort(() => Math.random() - 0.5)
            .map((item) => item.wordId)
            .slice(0, wordsPerTraining);
    }

    const words = await dictionaryService.getDictionary(userId, { ids: wordsIds });

    return res.status(200).json(words);
};
