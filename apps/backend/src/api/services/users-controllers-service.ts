import { getAllUsers } from "../controllers/users/get-all-users";
import { getUserById } from "../controllers/users/get-user-by-id";
import { signUpUser } from "../controllers/users/sign-up-user";

export const usersControllersService = {
    signUpUser,
    getAllUsers,
    getUserById,
};
