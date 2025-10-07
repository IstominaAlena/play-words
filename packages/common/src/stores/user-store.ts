import { create } from "zustand";
import { persist } from "zustand/middleware";

import { User } from "../types/users";

interface UserState {
    user: User | null;
    token: string | null;
    saveUser: (user: User) => void;
    clearUser: () => void;
    saveToken: (token: string) => void;
    clearToken: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            token: "",
            saveUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            saveToken: (token) => set({ token }),
            clearToken: () => set({ token: null }),
        }),
        { name: "user" },
    ),
);
