import { create } from "zustand";
import { persist } from "zustand/middleware";

import { deleteAccessToken, saveAccessToken } from "../config/client-storage";
import { User } from "../types/users";

interface UserState {
    user: User | null;
    accessToken: string | null;
    saveUser: (user: User) => void;
    clearUser: () => void;
    saveToken: (token: string) => void;
    clearToken: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: "",
            saveUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            saveToken: (token) => {
                set({ accessToken: token });
                saveAccessToken(token);
            },
            clearToken: () => {
                set({ accessToken: null });
                deleteAccessToken();
            },
        }),
        { name: "user" },
    ),
);
