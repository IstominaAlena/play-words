import { getCurrentUser } from "./get-current-user";
import { logoutUser } from "./logout-user";
import { refreshUser } from "./refresh-user";
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
};
