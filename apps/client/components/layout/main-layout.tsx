import { FC, PropsWithChildren } from "react";

import { GradientLine } from "@repo/ui/components/gradient-line";

import { Header } from "./header";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Header />
            <main className="flex w-full flex-1 flex-col">{children}</main>
            <footer className="relative h-16 w-full">
                <GradientLine className="absolute top-0 left-0" />
            </footer>
        </>
    );
};
