"use client";

import dynamic from "next/dynamic";

import { useAuthHandlers } from "@/hooks/use-auth-handlers";

const Toaster = dynamic(() => import("@repo/ui/core/sonner"), { ssr: false });

const AppInitializer = () => {
    useAuthHandlers();

    return <Toaster />;
};

export default AppInitializer;
