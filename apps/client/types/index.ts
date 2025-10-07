import { z } from "zod";

import { resetUserPasswordDtoSchema, signUpUserSchema } from "../schemas";

export type SignUpUser = z.infer<typeof signUpUserSchema>;
export type ResetPasswordDto = z.infer<typeof resetUserPasswordDtoSchema>;
