"use client";

import { FC, PropsWithChildren } from "react";

import { GlowingContainer } from "@repo/ui/core/glowing-container";
import { Meteors } from "@repo/ui/core/meteors";

import useWindowDimensions from "@repo/common/hooks/use-window-dimensions.ts";

const ResetPasswordLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isMd } = useWindowDimensions();
    return (
        <section className="relative flex flex-1 items-center justify-center overflow-hidden">
            <Meteors number={10} containerWidth={isMd ? 800 : 2500} />
            <GlowingContainer
                containerClassName="rounded-lg max-w-[30rem] md:max-w-[calc(100%-1rem)] mx-auto"
                contentClassName="p-6 bg-secondary_dark flex flex-col gap-4 items-center"
            >
                {children}
            </GlowingContainer>
        </section>
    );
};

export default ResetPasswordLayout;
