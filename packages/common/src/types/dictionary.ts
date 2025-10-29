import z from "zod";

import { createWordSchema } from "../schemas/dictionary";

export type CreateWordDto = z.infer<typeof createWordSchema>;
