import { Response } from "express";

import { CreateWordDto } from "@repo/common/types/dictionary";

import { messageKeys } from "@/constants/common";
import { demoDictionaryService } from "@/db/services/dictionary/demo-dictionary-service";
import { AppError } from "@/services/error-service";
import { AppRequest } from "@/types/common";

export const addDemoWord = async (req: AppRequest<CreateWordDto>, res: Response) => {
    const { word, translations, definitions } = req.body;

    if (!word || translations.length === 0 || definitions.length === 0) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const wordId = await demoDictionaryService.createDemoWord({ word, translations, definitions });

    if (!wordId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    return res.status(204).end();
};
