import { eq, sql } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { definitionsTable, translationsTable, wordsTable } from "@/db/schemas/dictionary-schemas";
import { CreateWord, UpdateWord, WordsTable } from "@/types/dictionary";

export class WordsService {
    private table = wordsTable;

    async createWord(data: CreateWord) {
        const existingWord = await this.getRawWordByValue(data.value);

        if (existingWord) {
            return existingWord.id;
        }

        const [newWord] = await db.insert(this.table).values(data).returning();

        return newWord?.id ?? null;
    }

    async getWordById(id: WordsTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.id, id)).limit(1);

        return result[0] ?? null;
    }

    async getRawWordByValue(value: WordsTable["value"]) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.value, value))
            .limit(1);

        return result[0] ?? null;
    }

    async getWordByValue(value: WordsTable["value"]) {
        const result = await db
            .select({
                definitions: sql<string[]>`
                            json_agg(distinct ${definitionsTable.value})
                        `.as("definitions"),
                translations: sql<string[]>`
                            json_agg(distinct ${translationsTable.value})
                        `.as("translations"),
            })
            .from(this.table)
            .where(eq(this.table.value, value.toLowerCase()))
            .leftJoin(definitionsTable, eq(this.table.id, definitionsTable.wordId))
            .leftJoin(translationsTable, eq(this.table.id, translationsTable.wordId))
            .limit(1);

        return result[0] ?? null;
    }

    async updateWord(id: WordsTable["id"], data: UpdateWord) {
        const result = await db
            .update(this.table)
            .set({ ...data, updatedAt: new Date().toISOString() })
            .where(eq(this.table.id, id))
            .returning({ id: this.table.id });

        return result[0]?.id ?? null;
    }

    async deleteWord(id: WordsTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }
}

export const wordsService = new WordsService();
