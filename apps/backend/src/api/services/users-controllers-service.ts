import { getCurrentUser } from "../controllers/users/get-current-user";
import { logoutUser } from "../controllers/users/logout-user";
import { refreshUser } from "../controllers/users/refresh-user";
import { signInUser } from "../controllers/users/sign-in-user";
import { signUpUser } from "../controllers/users/sign-up-user";
import { updateCurrentUser } from "../controllers/users/update-current-user";

export const usersControllersService = {
    signUpUser,
    signInUser,
    refreshUser,
    logoutUser,
    getCurrentUser,
    updateCurrentUser,
};
