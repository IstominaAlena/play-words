import { changePassword } from "./account/change-password";
import { disableOtp } from "./account/disable-otp";
import { disconnectGoogleAccount } from "./account/disconnect-google-account";
import { enableOtp } from "./account/enable-otp";
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
import { verifyUserOtp } from "./auth/verify-user-otp";

export const usersControllersService = {
    // auth
    signUpUser,
    signInUser,
    refreshUser,
    logoutUser,
    resetUserPasswordRequest,
    resetUserPassword,
    initiateGoogleAuth,
    googleAuthCallback,
    verifyUserOtp,

    // account
    getCurrentUser,
    updateCurrentUser,
    changePassword,
    disconnectGoogleAccount,
    initiateGoogleConnect,
    googleConnectCallback,
    enableOtp,
    disableOtp,
};
