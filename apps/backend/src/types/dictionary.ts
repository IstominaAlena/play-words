import {
    definitionsTable,
    dictionaryTable,
    translationsTable,
    wordsTable,
} from "@/db/schemas/dictionary-schemas";

//  Tables
export type WordsTable = typeof wordsTable.$inferSelect;
export type DefinitionsTable = typeof definitionsTable.$inferSelect;
export type TranslationsTable = typeof translationsTable.$inferSelect;
export type DictionaryTable = typeof dictionaryTable.$inferSelect;

// Create types
export type CreateWord = typeof wordsTable.$inferInsert;
export type CreateDefinition = typeof definitionsTable.$inferInsert;
export type CreateTranslation = typeof translationsTable.$inferInsert;
export type CreateDictionaryRow = typeof dictionaryTable.$inferInsert;

// Update
export type UpdateWord = Partial<CreateWord>;
export type UpdateDefinition = Partial<CreateDefinition>;
export type UpdateTranslation = Partial<CreateTranslation>;
