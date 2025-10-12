import {
    refreshTokensTable,
    resetPasswordTokensTable,
    userCredentialsTable,
    usersTable,
} from "@/db/schemas/user-schemas";

// Tables
export type UsersTable = typeof usersTable.$inferSelect;
export type UserCredentialsTable = typeof userCredentialsTable.$inferSelect;
export type RefreshTokensTable = typeof refreshTokensTable.$inferSelect;
export type ResetPasswordTokensTable = typeof resetPasswordTokensTable.$inferSelect;

// Create types
export type CreateUser = typeof usersTable.$inferInsert;
export type CreateUserCredentials = typeof userCredentialsTable.$inferInsert;
export type CreateRefreshToken = typeof refreshTokensTable.$inferInsert;
export type CreateResetPasswordToken = typeof resetPasswordTokensTable.$inferInsert;

// update
export type UpdateUserCredentials = Partial<CreateUserCredentials>;

// test
export type ValidateTokenTableType = typeof refreshTokensTable | typeof resetPasswordTokensTable;
