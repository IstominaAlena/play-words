"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

import { DEFAULT_THEME, themeVariants } from "@repo/common/constants/common";

export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme={DEFAULT_THEME} themes={themeVariants}>
            {children}
        </ThemeProvider>
    );
};
