import { and, eq } from "drizzle-orm";

import { db } from "@/config/drizzle-orm/db";
import { definitionsTable } from "@/db/schemas/dictionary-schemas";
import { CreateDefinition, DefinitionsTable, UpdateDefinition } from "@/types/dictionary";

export class DefinitionsService {
    private table = definitionsTable;

    async createDefinition(data: CreateDefinition) {
        const existingDefinition = await this.getDefinitionByValue(data.wordId, data.value);

        if (existingDefinition) {
            return existingDefinition.id;
        }

        const [newDefinition] = await db.insert(this.table).values(data).returning();

        return newDefinition?.id ?? null;
    }

    async getDefinitionById(id: DefinitionsTable["id"]) {
        const result = await db.select().from(this.table).where(eq(this.table.id, id)).limit(1);

        return result[0] ?? null;
    }

    async getDefinitionByValue(wordId: DefinitionsTable["wordId"], value: string) {
        const result = await db
            .select()
            .from(this.table)
            .where(and(eq(this.table.wordId, wordId), eq(this.table.value, value)))
            .limit(1);

        return result[0] ?? null;
    }

    async updateDefinition(id: DefinitionsTable["id"], data: UpdateDefinition) {
        const result = await db
            .update(this.table)
            .set({ ...data, updatedAt: new Date().toISOString() })
            .where(eq(this.table.id, id))
            .returning({ id: this.table.id });

        return result[0]?.id ?? null;
    }

    async deleteDefinition(id: DefinitionsTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }
}

export const definitionsService = new DefinitionsService();
