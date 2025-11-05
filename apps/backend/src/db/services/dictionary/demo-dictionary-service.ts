import { eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { demoDictionaryTable } from "@/db/schemas/dictionary-schemas";
import { CreateDemoWord, UpdateWord, WordsTable } from "@/types/dictionary";

export class DemoDictionaryService {
    private table = demoDictionaryTable;

    async createDemoWord(data: CreateDemoWord) {
        const [newWord] = await db.insert(this.table).values(data).returning();

        return newWord?.wordId ?? null;
    }

    async getDemoWordById(id: WordsTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.wordId, id)).limit(1);

        return result[0] ?? null;
    }

    async getDemoWordByValue(value: WordsTable["value"]) {
        const result = await db
            .select()
            .from(this.table)
            .where(eq(this.table.word, value))
            .limit(1);

        return result[0] ?? null;
    }

    async updateDemoWord(id: WordsTable["id"], data: UpdateWord) {
        const result = await db
            .update(this.table)
            .set({ ...data, updatedAt: new Date().toISOString() })
            .where(eq(this.table.wordId, id))
            .returning({ id: this.table.wordId });

        return result[0]?.id ?? null;
    }

    async deleteDemoWord(id: WordsTable["id"]) {
        await db.delete(this.table).where(eq(this.table.wordId, id));
    }

    async getDemoDictionary() {
        const result = await db.select().from(this.table);

        return result ?? null;
    }
}

export const demoDictionaryService = new DemoDictionaryService();
