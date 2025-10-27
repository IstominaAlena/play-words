import { Router } from "express";

import {
    changePasswordSchema,
    createAccountSchema,
    loginSchema,
    resetPasswordRequestSchema,
    resetPasswordSchema,
    updateAccountSchema,
    verifyOtpSchema,
} from "@repo/common/schemas/account";

import { authValidation } from "@/middlewares/auth-validation";
import { validateBody } from "@/middlewares/body-validation";
import { controllerWrapper } from "@/middlewares/controller-wrapper";

import { usersControllersService } from "../controllers/users/service";

const router = Router();

// auth
router.post("/sign-up", validateBody(createAccountSchema), usersControllersService.signUpUser);

router.post("/sign-in", validateBody(loginSchema), usersControllersService.signInUser);

router.post("/verify-otp", validateBody(verifyOtpSchema), usersControllersService.verifyUserOtp);

router.get("/google/auth", usersControllersService.initiateGoogleAuth);

router.get("/google/callback", controllerWrapper(usersControllersService.googleAuthCallback));

router.post("/refresh", controllerWrapper(usersControllersService.refreshUser));

router.post("/logout", controllerWrapper(usersControllersService.logoutUser));

router.post(
    "/reset-password-request",
    validateBody(resetPasswordRequestSchema),
    controllerWrapper(usersControllersService.resetUserPasswordRequest),
);

router.post(
    "/reset-password",
    validateBody(resetPasswordSchema),
    controllerWrapper(usersControllersService.resetUserPassword),
);

// account
router.get("/me", authValidation, controllerWrapper(usersControllersService.getCurrentUser));

router.patch(
    "/me",
    authValidation,
    validateBody(updateAccountSchema),
    controllerWrapper(usersControllersService.updateCurrentUser),
);

router.patch("/me/delete", authValidation, controllerWrapper(usersControllersService.deleteUser));

router.patch("/me/restore", authValidation, controllerWrapper(usersControllersService.restoreUser));

router.patch(
    "/change-password",
    authValidation,
    validateBody(changePasswordSchema),
    controllerWrapper(usersControllersService.changePassword),
);

router.get("/google/connect", authValidation, usersControllersService.initiateGoogleConnect);

router.patch(
    "/google/disconnect",
    authValidation,
    controllerWrapper(usersControllersService.disconnectGoogleAccount),
);

router.get("/google/connect/callback", usersControllersService.googleConnectCallback);

router.patch("/otp/enable", authValidation, controllerWrapper(usersControllersService.enableOtp));

router.patch("/otp/disable", authValidation, controllerWrapper(usersControllersService.disableOtp));

router.get("/otp", authValidation, controllerWrapper(usersControllersService.getOtpSettings));

export default router;
