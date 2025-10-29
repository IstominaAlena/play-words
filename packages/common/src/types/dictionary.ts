import z from "zod";

import { createWordSchema } from "../schemas/dictionary";

export interface DictionaryItem {
    id: number;
    value: string;
}

export interface Word {
    id: number;
    word: string;
    definitions: DictionaryItem[];
    translations: DictionaryItem[];
}

export interface Dictionary {
    data: Word[];
    total: number;
    pages: number;
    page: number;
}

export type CreateWordDto = z.infer<typeof createWordSchema>;
