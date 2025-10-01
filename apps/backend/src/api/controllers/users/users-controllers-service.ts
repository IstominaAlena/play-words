import { getAllUsers } from "./get-all-users";
import { getUserById } from "./get-user-by-id";
import { signUpUser } from "./sign-up-user";

export const usersControllersService = {
    signUpUser,
    getAllUsers,
    getUserById,
};
