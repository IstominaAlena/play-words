import { Router } from "express";

import {
    changePasswordSchema,
    createUserSchema,
    loginUserSchema,
    resetUserPasswordRequestSchema,
    resetUserPasswordSchema,
    updateUserSchema,
} from "@repo/common/schemas/users";

import { authValidation } from "@/middlewares/auth-validation";
import { validateBody } from "@/middlewares/body-validation";
import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { usersControllersService } from "../controllers/users/service";

const router = Router();

// auth flow
router.post("/sign-up", validateBody(createUserSchema), usersControllersService.signUpUser);

router.post("/sign-in", validateBody(loginUserSchema), usersControllersService.signInUser);

router.get("/google/auth", usersControllersService.initiateGoogleAuth);

router.get("/google/callback", controllerWrapper(usersControllersService.googleAuthCallback));

router.post("/refresh", controllerWrapper(usersControllersService.refreshUser));

router.post("/logout", controllerWrapper(usersControllersService.logoutUser));

router.post(
    "/reset-password-request",
    validateBody(resetUserPasswordRequestSchema),
    controllerWrapper(usersControllersService.resetUserPasswordRequest),
);

router.post(
    "/reset-password",
    validateBody(resetUserPasswordSchema),
    controllerWrapper(usersControllersService.resetUserPassword),
);

// protected routes
router.get("/me", authValidation, controllerWrapper(usersControllersService.getCurrentUser));

router.patch(
    "/me",
    authValidation,
    validateBody(updateUserSchema),
    controllerWrapper(usersControllersService.updateCurrentUser),
);

router.patch(
    "/change-password",
    authValidation,
    validateBody(changePasswordSchema),
    controllerWrapper(usersControllersService.changePassword),
);

router.get("/google/connect", authValidation, usersControllersService.initiateGoogleConnect);

router.post(
    "/google/disconnect",
    authValidation,
    controllerWrapper(usersControllersService.disconnectGoogleAccount),
);

router.get(
    "/google/connect/callback",
    authValidation,
    controllerWrapper(usersControllersService.googleConnectCallback),
);

export default router;
