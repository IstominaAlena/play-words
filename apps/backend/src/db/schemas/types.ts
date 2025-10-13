import { pgEnum } from "drizzle-orm/pg-core";

export const authProvider = pgEnum("provider", ["local", "google"]);
