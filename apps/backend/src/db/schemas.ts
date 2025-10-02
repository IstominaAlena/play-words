import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial("id").notNull().primaryKey(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

export const userTokensTable = pgTable("user_tokens", {
    id: serial("id").notNull().primaryKey(),
    userId: serial("user_id")
        .notNull()
        .references(() => usersTable.id),
    tokenHash: varchar("token_hash", { length: 255 }).notNull(),
    expiresAt: varchar("expires_at", { length: 255 }).notNull(),
    revoked: boolean("revoked").notNull().default(false),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});
