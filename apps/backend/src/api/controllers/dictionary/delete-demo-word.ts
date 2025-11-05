import { Response } from "express";

import { DeleteWordDto } from "@repo/common/types/api";

import { messageKeys } from "@/constants/common";
import { demoDictionaryService } from "@/db/services/dictionary/demo-dictionary-service";
import { AppError } from "@/services/error-service";
import { AppRequest } from "@/types/common";

export const deleteDemoWord = async (req: AppRequest<object, DeleteWordDto>, res: Response) => {
    const wordId = Number(req.query.wordId);

    if (!wordId || isNaN(wordId)) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    await demoDictionaryService.deleteDemoWord(wordId);

    return res.status(204).end();
};
