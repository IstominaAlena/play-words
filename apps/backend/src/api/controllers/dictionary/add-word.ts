import { Response } from "express";

import { CreateWordDto } from "@repo/common/types/dictionary";

import { messageKeys } from "@/constants/common";
import { definitionsService } from "@/db/services/dictionary/definitions-service";
import { dictionaryService } from "@/db/services/dictionary/dictionary-service";
import { translationsService } from "@/db/services/dictionary/translations-service";
import { wordsService } from "@/db/services/dictionary/words-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const addWord = async (req: AuthenticatedRequest<CreateWordDto>, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const { word, translations, definitions } = req.body;

    if (!word || translations.length === 0 || definitions.length === 0) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const wordId = await wordsService.createWord({ value: word });

    if (!wordId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    const definitionsIds = (
        await Promise.all(
            definitions.map(async (definition) => {
                const id = await definitionsService.createDefinition({ wordId, value: definition });

                if (!id) {
                    throw new AppError(500, messageKeys.FAILED_TO_CREATE, undefined, {
                        data: definition,
                    });
                }

                return id;
            }),
        )
    ).filter((id): id is number => !!id);

    const translationsIds = (
        await Promise.all(
            translations.map(async (translation) => {
                const id = await translationsService.createTranslation({
                    wordId,
                    value: translation,
                });

                if (!id) {
                    throw new AppError(500, messageKeys.FAILED_TO_CREATE, undefined, {
                        data: translation,
                    });
                }

                return id;
            }),
        )
    ).filter((id): id is number => !!id);

    const dictionaryData = definitionsIds.flatMap((definitionId) =>
        translationsIds.map((translationId) => ({
            userId,
            wordId,
            definitionId,
            translationId,
        })),
    );

    await dictionaryService.createDictionaryRow(dictionaryData);

    return res.status(204).end();
};
