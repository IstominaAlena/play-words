import { and, asc, eq, ilike, inArray, sql } from "drizzle-orm";
import { count } from "drizzle-orm";

import { DEFAULT_ITEMS_PER_PAGE } from "@repo/common/constants/common";

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

    async createDictionaryRow(data: CreateDictionaryRow[]) {
        if (data.length === 0) {
            return [];
        }

        return await db
            .insert(this.table)
            .values(data)
            .onConflictDoNothing()
            .returning({ id: this.table.id });
    }

    async deleteDictionaryRow(id: DictionaryTable["id"]) {
        await db.delete(this.table).where(eq(this.table.id, id));
    }

    async deleteDictionaryRowsByWordId(
        userId: DictionaryTable["wordId"],
        wordId: DictionaryTable["wordId"],
    ) {
        await db
            .delete(this.table)
            .where(and(eq(this.table.userId, userId), eq(this.table.wordId, wordId)));
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

    async getDictionary(
        userId: DictionaryTable["userId"],
        {
            pageSize = DEFAULT_ITEMS_PER_PAGE,
            page = 1,
            search = "",
            ids,
        }: { pageSize?: number; page?: number; search?: string; ids?: number[] },
    ) {
        const baseWhere = [eq(this.table.userId, userId)];

        if (search) {
            baseWhere.push(ilike(wordsTable.value, `%${search.trim()}%`));
        }

        if (ids && ids.length > 0) {
            baseWhere.push(inArray(this.table.wordId, ids));
        }

        const data = await db
            .select({
                wordId: this.table.wordId,
                word: wordsTable.value,
                definitions: sql<string[]>`
                json_agg(distinct ${definitionsTable.value})
            `.as("definitions"),
                translations: sql<string[]>`
                json_agg(distinct ${translationsTable.value})
            `.as("translations"),
            })
            .from(this.table)
            .where(and(...baseWhere))
            .leftJoin(wordsTable, eq(this.table.wordId, wordsTable.id))
            .leftJoin(
                definitionsTable,
                and(
                    eq(this.table.wordId, definitionsTable.wordId),
                    eq(this.table.definitionId, definitionsTable.id),
                ),
            )
            .leftJoin(
                translationsTable,
                and(
                    eq(this.table.wordId, translationsTable.wordId),
                    eq(this.table.translationId, translationsTable.id),
                ),
            )
            .groupBy(this.table.wordId, wordsTable.value)
            .orderBy(asc(wordsTable.value))
            .limit(pageSize)
            .offset((page - 1) * pageSize);

        const [countRows] = await db
            .select({ total: count(sql`distinct ${this.table.wordId}`) })
            .from(this.table)
            .where(eq(this.table.userId, userId));

        const total = countRows?.total ?? 0;
        const pages = Math.ceil(total / pageSize);

        return { data, total, pages, page };
    }
}

export const dictionaryService = new DictionaryService();
