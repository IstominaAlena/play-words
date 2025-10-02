import z from "zod";

import { createUserSchema, loginUserSchema } from "../schemas/users";

export interface User {
    id: number;
    email: string;
    username: string;
}

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type LoginUserDto = z.infer<typeof loginUserSchema>;
