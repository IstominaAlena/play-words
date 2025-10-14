import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Settings, User } from "../types/users";

interface UserState {
    user: User | null;
    settings: Settings | null;
    saveUser: (user: User) => void;
    clearUser: () => void;
    saveSettings: (settings: Settings) => void;
    clearSettings: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            settings: null,
            saveUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
            saveSettings: (settings) => set({ settings }),
            clearSettings: () => set({ settings: null }),
        }),
        { name: "user" },
    ),
);
