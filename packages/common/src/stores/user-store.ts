import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Account, Settings } from "../types/account";

interface UserState {
    user: Account | null;
    settings: Settings | null;
    saveUser: (user: Account) => void;
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
