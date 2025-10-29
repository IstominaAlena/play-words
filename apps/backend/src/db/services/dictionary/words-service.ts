import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { wordsTable } from "@/db/schemas/dictionary-schemas";
import { CreateWord, UpdateWord, WordsTable } from "@/types/dictionary";

export class WordsService {
    private table = wordsTable;

    async createWord(data: CreateWord) {
        const existingWord = await this.getWordByValue(data.value);

        if (existingWord) {
            return existingWord;
        }

        const [newWord] = await db.insert(this.table).values(data).returning();

        return newWord;
    }

    async getWordById(id: WordsTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.id, id)).limit(1);

        return result[0] ?? null;
    }

    async getWordByValue(value: WordsTable["value"]) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.value, value))
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
