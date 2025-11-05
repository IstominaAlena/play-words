"use client";

import { FC, PropsWithChildren } from "react";

import { GlowingStarsBackground } from "@repo/ui/core/glowing-starts";

const ResetPasswordLayout: FC<PropsWithChildren> = ({ children }) => (
    <section className="relative flex flex-1 items-center justify-center overflow-hidden">
        <GlowingStarsBackground />

        <div className="bg-secondary_dark relative mx-auto flex w-full max-w-[30rem] flex-col items-center gap-4 rounded-lg p-6 md:max-w-[calc(100%-1rem)]">
            {children}
        </div>
    </section>
);

export default ResetPasswordLayout;
