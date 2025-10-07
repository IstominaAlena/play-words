import { z } from "zod";

import {
    changePasswordSchema,
    editCurrentUserSchema,
    resetUserPasswordDtoSchema,
    signUpUserSchema,
} from "../schemas";

export type SignUpUser = z.infer<typeof signUpUserSchema>;

export type ResetPasswordDto = z.infer<typeof resetUserPasswordDtoSchema>;

export type EditCurrentUserDto = z.infer<typeof editCurrentUserSchema>;

export type ChangePasswordDto = z.infer<typeof changePasswordSchema>;
