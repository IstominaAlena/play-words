import { changePassword } from "./change-password";
import { disconnectGoogleAccount } from "./disconnect-google-account";
import { getCurrentUser } from "./get-current-user";
import { googleAuthCallback } from "./google-auth-callback";
import { googleConnectCallback } from "./google-connect-callback";
import { initiateGoogleAuth } from "./initiate-google-auth";
import { initiateGoogleConnect } from "./initiate-google-connect";
import { logoutUser } from "./logout-user";
import { refreshUser } from "./refresh-user";
import { resetUserPassword } from "./reset-user-password";
import { resetUserPasswordRequest } from "./reset-user-password-request";
import { signInUser } from "./sign-in-user";
import { signUpUser } from "./sign-up-user";
import { updateCurrentUser } from "./update-current-user";

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
