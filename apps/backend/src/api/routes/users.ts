import { Router } from "express";

import { createUserSchema, loginUserSchema } from "@repo/common/schemas/users";

import { usersControllersService } from "@/api/services/users-controllers-service";
import { validateBody } from "@/middlewares/body-validation";
import { controllerWrapper } from "@/middlewares/controller-wrapper";

const router = Router();

router.post(
    "/sign-up",
    validateBody(createUserSchema),
    controllerWrapper(usersControllersService.signUpUser),
);

router.post(
    "/sign-in",
    validateBody(loginUserSchema),
    controllerWrapper(usersControllersService.signInUser),
);

export default router;
