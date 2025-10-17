import { changePassword } from "./account/change-password";
import { disconnectGoogleAccount } from "./account/disconnect-google-account";
import { getCurrentUser } from "./account/get-current-user";
import { googleConnectCallback } from "./account/google-connect-callback";
import { initiateGoogleConnect } from "./account/initiate-google-connect";
import { updateCurrentUser } from "./account/update-current-user";
import { googleAuthCallback } from "./auth/google-auth-callback";
import { initiateGoogleAuth } from "./auth/initiate-google-auth";
import { logoutUser } from "./auth/logout-user";
import { refreshUser } from "./auth/refresh-user";
import { resetUserPassword } from "./auth/reset-user-password";
import { resetUserPasswordRequest } from "./auth/reset-user-password-request";
import { signInUser } from "./auth/sign-in-user";
import { signUpUser } from "./auth/sign-up-user";

export const usersControllersService = {
    signUpUser,
    signInUser,
    refreshUser,
    logoutUser,
    getCurrentUser,
    updateCurrentUser,
    resetUserPasswordRequest,
    resetUserPassword,
    changePassword,
    disconnectGoogleAccount,

    // google
    initiateGoogleAuth,
    googleAuthCallback,
    initiateGoogleConnect,
    googleConnectCallback,
};
