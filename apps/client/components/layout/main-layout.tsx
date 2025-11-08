import { FC, PropsWithChildren } from "react";

import AppInitializer from "../auth/auth-initializer";
import { Footer } from "./footer";
import { Header } from "./header";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <AppInitializer />
            <Header />
            <main className="flex w-full flex-1 flex-col">{children}</main>
            <Footer />
        </>
    );
};
