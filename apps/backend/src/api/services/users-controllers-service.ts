import { getAllUsers } from "../controllers/users/get-all-users";
import { getUserById } from "../controllers/users/get-user-by-id";
import { refreshUser } from "../controllers/users/refresh-user";
import { signInUser } from "../controllers/users/sign-in-user";
import { signUpUser } from "../controllers/users/sign-up-user";

export const usersControllersService = {
    signUpUser,
    signInUser,
    refreshUser,
    getAllUsers,
    getUserById,
};
