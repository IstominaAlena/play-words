import z from "zod";

export const createWordSchema = z.object({
    word: z.string().min(1, "REQUIRED"),
    translations: z.array(z.string().min(1, "REQUIRED")).min(1, "REQUIRED"),
    definitions: z.array(z.string().min(1, "REQUIRED")).min(1, "REQUIRED"),
});
