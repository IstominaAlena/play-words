"use client";

import { FC, PropsWithChildren } from "react";

import { GlowingStarsBackground } from "@repo/ui/core/glowing-starts";

import { AccountNav } from "@/components/account/account-navigation";

const AccountLayout: FC<PropsWithChildren> = ({ children }) => (
    <section className="relative flex flex-1 flex-col py-10 md:py-6">
        <GlowingStarsBackground />
        <div className="container flex flex-1 gap-6 md:flex-col md:gap-4">
            <AccountNav />
            <div className="bg-secondary_bg/80 z-20 w-full flex-3 rounded-lg p-6">{children}</div>
        </div>
    </section>
);

export default AccountLayout;
