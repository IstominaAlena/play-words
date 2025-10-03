import { refreshTokensTable, resetPasswordTokensTable, usersTable } from "@/db/schemas";

export type UsersTable = typeof usersTable.$inferSelect;

export type RefreshTokensTable = typeof refreshTokensTable.$inferSelect;

export type ResetPasswordTokensTable = typeof resetPasswordTokensTable.$inferSelect;

export type ValidateTokenTableType = typeof refreshTokensTable | typeof resetPasswordTokensTable;

export type CreateUser = typeof usersTable.$inferInsert;

export type UpdateUser = Partial<CreateUser>;

export type CreateUserToken = { userId: number; tokenHash: string };
