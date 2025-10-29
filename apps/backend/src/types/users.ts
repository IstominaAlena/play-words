import {
    refreshTokensTable,
    resetPasswordTokensTable,
    userCredentialsTable,
    userSettingsTable,
    usersTable,
} from "@/db/schemas/user-schemas";

// Tables
export type UsersTable = typeof usersTable.$inferSelect;
export type UserCredentialsTable = typeof userCredentialsTable.$inferSelect;
export type UserSettingsTable = typeof userSettingsTable.$inferSelect;
export type RefreshTokensTable = typeof refreshTokensTable.$inferSelect;
export type ResetPasswordTokensTable = typeof resetPasswordTokensTable.$inferSelect;

// Create types
export type CreateUser = typeof usersTable.$inferInsert;
export type CreateUserCredentials = typeof userCredentialsTable.$inferInsert;
export type CreateUserSettings = typeof userSettingsTable.$inferInsert;
export type CreateRefreshToken = typeof refreshTokensTable.$inferInsert;
export type CreateResetPasswordToken = typeof resetPasswordTokensTable.$inferInsert;

// Update
export type UpdateUser = Partial<CreateUser>;
export type UpdateUserCredentials = Partial<CreateUserCredentials>;
export type UpdateUserSettings = Partial<CreateUserSettings>;

// Tokens
export type ValidateTokenTableType = typeof refreshTokensTable | typeof resetPasswordTokensTable;
