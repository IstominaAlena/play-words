import { userTokensTable, usersTable } from "@/db/schemas/users";

export type UsersTable = typeof usersTable.$inferSelect;

export type UserTokensTable = typeof userTokensTable.$inferSelect;

export type CreateUser = typeof usersTable.$inferInsert;

export type UpdateUser = Partial<CreateUser>;

export type CreateUserToken = Pick<UserTokensTable, "userId" | "tokenHash">;
