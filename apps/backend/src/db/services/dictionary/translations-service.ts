import { and, eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { translationsTable } from "@/db/schemas/dictionary-schemas";
import { CreateTranslation, TranslationsTable, UpdateTranslation } from "@/types/dictionary";

export class TranslationsService {
    private table = translationsTable;

    async createTranslation(data: CreateTranslation) {
        const existingTranslation = await this.getTranslationByValue(data.wordId, data.value);

        if (existingTranslation) {
            return existingTranslation;
        }

        const [newTranslation] = await db.insert(this.table).values(data).returning();

        return newTranslation;
    }

    async getTranslationById(id: TranslationsTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.id, id)).limit(1);

        return result[0] ?? null;
    }

    async getTranslationByValue(wordId: TranslationsTable["wordId"], value: string) {
        const result = await db
            .select()
            .from(this.table)
            .where(and(eq(this.table.wordId, wordId), eq(this.table.value, value)))
            .limit(1);

        return result[0] ?? null;
    }

    async updateTranslation(id: TranslationsTable["id"], data: UpdateTranslation) {
        const result = await db
            .update(this.table)
            .set({ ...data, updatedAt: new Date().toISOString() })
            .where(eq(this.table.id, id))
            .returning({ id: this.table.id });

        return result[0]?.id ?? null;
    }

    async deleteTranslation(id: TranslationsTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }
}

export const translationsService = new TranslationsService();
