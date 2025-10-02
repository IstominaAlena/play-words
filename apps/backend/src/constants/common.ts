import { Messages } from "@/types/common";

import defaultLang from "../messages/en.json";

export const ACCESS_TOKEN_EXP = "15m";

export const REFRESH_TOKEN_TTL_DAYS = 30;

export const JWT_SECRET = process.env.JWT_SECRET || "superSecret_key";

export const messageKeys = Object.keys(defaultLang).reduce(
    (acc, item) => ({ ...acc, [item as keyof Messages]: item as keyof Messages }),
    {} as Record<keyof Messages, keyof Messages>,
);
