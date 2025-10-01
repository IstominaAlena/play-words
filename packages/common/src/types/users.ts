import z from "zod";

import { createUserSchema } from "../schemas/users";

export interface User {
    id: number;
    email: string;
    username: string;
}

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = Partial<CreateUserDto>;
