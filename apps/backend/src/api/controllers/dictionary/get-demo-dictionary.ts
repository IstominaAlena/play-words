import { Response } from "express";

import { demoDictionaryService } from "@/db/services/dictionary/demo-dictionary-service";
import { AppRequest } from "@/types/common";

export const getDemoDictionary = async (_req: AppRequest, res: Response) => {
    const demoDictionary = await demoDictionaryService.getDemoDictionary();
    return res
        .status(200)
        .json({ data: demoDictionary, total: demoDictionary.length, pages: 1, page: 1 });
};
