import { z } from "zod";

import { signUpUserSchema } from "../schemas";

export type SignUpUser = z.infer<typeof signUpUserSchema>;
