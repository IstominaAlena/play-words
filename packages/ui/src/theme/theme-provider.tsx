"use client";

import { ThemeProvider } from "next-themes";
import { FC, ReactNode } from "react";

import { Accent, Mode } from "@repo/common/enums/common";

const themeVariants = Object.values(Mode).flatMap((mode) =>
    Object.values(Accent).map((accent) => `${mode}-${accent}`),
);

export const AppThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme={"dark-green"}
            themes={themeVariants}
            storageKey="mode"
        >
            {children}
        </ThemeProvider>
    );
};
