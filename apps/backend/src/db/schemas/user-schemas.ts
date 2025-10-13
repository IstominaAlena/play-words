import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { authProvider } from "./types";

export const usersTable = pgTable("users", {
    id: serial("id").notNull().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 255 }).notNull(),
    isVerified: boolean("is_verified").notNull().default(true),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userCredentialsTable = pgTable("user_credentials", {
    id: serial("id").notNull().primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    provider: authProvider().notNull(),
    passwordHash: varchar("password_hash", { length: 255 }),
    providerId: varchar("provider_id", { length: 255 }).unique(),
});

export const refreshTokensTable = pgTable("refresh_tokens", {
    id: serial("id").notNull().primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 255 }).notNull(),
    expiresAt: varchar("expires_at", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const resetPasswordTokensTable = pgTable("reset_password_tokens", {
    id: serial("id").notNull().primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    tokenHash: varchar("token_hash", { length: 255 }).notNull(),
    expiresAt: varchar("expires_at", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
