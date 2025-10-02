import { Router } from "express";

import { createUserSchema, loginUserSchema, updateUserSchema } from "@repo/common/schemas/users";

import { usersControllersService } from "@/api/services/users-controllers-service";
import { authValidation } from "@/middlewares/auth-validation";
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

router.post("/refresh", controllerWrapper(usersControllersService.refreshUser));

router.post("/logout", controllerWrapper(usersControllersService.logoutUser));

router.patch(
    "/me",
    authValidation,
    validateBody(updateUserSchema),
    controllerWrapper(usersControllersService.updateCurrentUser),
);
router.get("/me", authValidation, controllerWrapper(usersControllersService.getCurrentUser));

export default router;
