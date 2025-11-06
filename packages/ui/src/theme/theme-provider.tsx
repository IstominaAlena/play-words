"use client";

import { ThemeProvider } from "next-themes";
import { FC } from "react";

export const Theme: FC<{ children: React.ReactNode }> = ({ children }) => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
    </ThemeProvider>
);
