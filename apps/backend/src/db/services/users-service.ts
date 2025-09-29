import { createUser } from "../queries/create/users";
import { deleteUser } from "../queries/delete/users";
import { getAllUsers, getUserById } from "../queries/read/users";
import { updateUser } from "../queries/update/users";

export const usersService = {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
};
