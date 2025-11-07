import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

import { DEFAULT_THEME, DEFAULT_WORDS_PER_TRAINING } from "@repo/common/constants/common";

import { authProvider } from "./types";

export const usersTable = pgTable("users", {
    id: serial("id").notNull().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
    deletionDate: timestamp("deletion_date", { mode: "string" }),
});

export const userCredentialsTable = pgTable("user_credentials", {
    id: serial("id").notNull().primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    provider: authProvider().notNull(),
    passwordHash: varchar("password_hash", { length: 255 }),
    otpSecret: varchar("otp_secret", { length: 255 }),
    googleProviderId: varchar("google_provider_id", { length: 255 }).unique(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userSettingsTable = pgTable("user_settings", {
    id: serial("id").notNull().primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => usersTable.id, { onDelete: "cascade" }),
    verified: boolean("verified").notNull().default(true),
    google: boolean("google").notNull().default(false),
    otp: boolean("otp").notNull().default(false),
    password: boolean("password").notNull().default(false),
    theme: varchar("theme", { length: 255 }).default(DEFAULT_THEME),
    wordsPerTraining: integer("words_per_training").default(DEFAULT_WORDS_PER_TRAINING),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
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
