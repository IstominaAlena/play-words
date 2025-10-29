import { and, eq, inArray } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import {
    definitionsTable,
    dictionaryTable,
    translationsTable,
    wordsTable,
} from "@/db/schemas/dictionary-schemas";
import { CreateDictionaryRow, DictionaryTable } from "@/types/dictionary";

export class DictionaryService {
    private table = dictionaryTable;

    async createDictionaryRow(data: CreateDictionaryRow) {
        const existingRow = await db
            .select()
            .from(this.table)
            .where(
                and(
                    eq(this.table.userId, data.userId),
                    eq(this.table.wordId, data.wordId),
                    eq(this.table.definitionId, data.definitionId),
                    eq(this.table.translationId, data.translationId),
                ),
            )
            .limit(1);

        if (existingRow[0]) {
            return existingRow[0];
        }

        const [newDictionaryRow] = await db.insert(this.table).values(data).returning();

        return newDictionaryRow;
    }

    async deleteDictionaryRow(id: DictionaryTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async getRawDictionaryById(id: DictionaryTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.id, id));

        return result ?? null;
    }

    async getRawDictionaryByUserId(id: DictionaryTable["userId"]) {
        const result = await db.select().from(this.table).where(eq(this.table.userId, id));

        return result ?? null;
    }

    async getRawDictionaryByWord(
        userId: DictionaryTable["userId"],
        wordId: DictionaryTable["wordId"],
    ) {
        return await db
            .select()
            .from(this.table)
            .where(and(eq(this.table.userId, userId), eq(this.table.wordId, wordId)));
    }

    async getDictionary(userId: DictionaryTable["userId"]) {
        const dictionaryRows = await db
            .select({
                wordId: dictionaryTable.wordId,
            })
            .from(this.table)
            .where(eq(this.table.userId, userId));

        const wordIds = Array.from(new Set(dictionaryRows.map((r) => r.wordId)));

        if (wordIds.length === 0) {
            return [];
        }

        const words = await db
            .select({
                id: wordsTable.id,
                word: wordsTable.value,
            })
            .from(wordsTable)
            .where(inArray(wordsTable.id, wordIds));

        const definitions = await db
            .select({
                wordId: definitionsTable.wordId,
                value: definitionsTable.value,
            })
            .from(definitionsTable)
            .where(inArray(definitionsTable.wordId, wordIds));

        const translations = await db
            .select({
                wordId: translationsTable.wordId,
                value: translationsTable.value,
            })
            .from(translationsTable)
            .where(inArray(translationsTable.wordId, wordIds));

        const result = words.map((w) => ({
            id: w.id,
            word: w.word,
            definitions: definitions.filter((d) => d.wordId === w.id).map((d) => d.value),
            translations: translations.filter((t) => t.wordId === w.id).map((t) => t.value),
        }));

        return result;
    }
}

export const dictionaryService = new DictionaryService();
