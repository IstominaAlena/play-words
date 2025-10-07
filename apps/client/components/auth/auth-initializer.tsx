"use client";

import { useAuthHandlers } from "@/hooks/use-auth-handlers";

export const AppInitializer = () => {
    useAuthHandlers();

    return null;
};
