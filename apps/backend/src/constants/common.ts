import { Messages } from "@/types/common";

import defaultLang from "../messages/en.json";

export const ACCESS_TOKEN_EXP = "15m";

export const DELETE_USER_REMAINING_PERIOD = 30;

export const REFRESH_TOKEN_TTL_DAYS = 30;

export const RESET_PASSWORD_TOKEN_TTL_TIME = 30;

export const JWT_SECRET = process.env.JWT_SECRET || "superSecret_key";

export const BASE_API_URL = process.env.BASE_API_URL ?? "";

export const BASE_CLIENT_URL = process.env.BASE_CLIENT_URL ?? "";

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";

export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";

export const messageKeys = Object.keys(defaultLang).reduce(
    (acc, item) => ({ ...acc, [item as keyof Messages]: item as keyof Messages }),
    {} as Record<keyof Messages, keyof Messages>,
);
