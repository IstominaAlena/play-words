"use client";

import { FC, PropsWithChildren } from "react";

import { NavBar } from "@repo/ui/components/nav-bar";
import { GlowingStarsBackground } from "@repo/ui/core/glowing-starts";
import { AccountIcon } from "@repo/ui/icons/account";

import { SecondaryRoutes } from "@/enums/routes";

const accountLinks = [{ key: "account", path: SecondaryRoutes.ACCOUNT, icon: AccountIcon }];

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="relative flex flex-1 flex-col py-10 md:py-6">
            <GlowingStarsBackground />
            <div className="container flex flex-1 gap-6 md:flex-col md:gap-4">
                <div className="z-20 w-full flex-1 overflow-x-auto">
                    <NavBar
                        links={accountLinks}
                        className="w-full flex-col text-xl md:flex-row"
                        linkClassName="py-2"
                    />
                </div>
                <div className="bg-secondary_dark/80 z-20 w-full flex-3 rounded-lg p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;
