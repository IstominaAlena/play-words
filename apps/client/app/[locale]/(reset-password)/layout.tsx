"use client";

import { FC, PropsWithChildren } from "react";

import { Meteors } from "@repo/ui/core/meteors";

import useWindowDimensions from "@repo/common/hooks/use-window-dimensions.ts";

const ResetPasswordLayout: FC<PropsWithChildren> = ({ children }) => {
    const { isMd } = useWindowDimensions();

    return (
        <section className="relative flex flex-1 items-center justify-center overflow-hidden">
            <Meteors number={10} containerWidth={isMd ? 800 : 2500} />

            <div className="bg-secondary_dark mx-auto flex w-full max-w-[30rem] flex-col items-center gap-4 rounded-lg p-6 md:max-w-[calc(100%-1rem)]">
                {children}
            </div>
        </section>
    );
};

export default ResetPasswordLayout;
