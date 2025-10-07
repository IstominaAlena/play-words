import { create } from "zustand";

interface LoaderState {
    isPending: boolean;
    startLoader: () => void;
    stopLoader: () => void;
}

export const useLoaderStore = create<LoaderState>()((set) => ({
    isPending: false,
    startLoader: () => {
        set({ isPending: true });
    },
    stopLoader: () => {
        set({ isPending: false });
    },
}));
