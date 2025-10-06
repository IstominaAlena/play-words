"use client";

import { Transition, motion } from "motion/react";
import { FC } from "react";

import { cn } from "../utils/class-names";

interface Props {
    isScreenProtection?: boolean;
}

export const Loader: FC<Props> = ({ isScreenProtection }) => {
    const transition = (x: number) => {
        return {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "loop" as const,
            delay: x * 0.2,
            ease: "easeInOut",
        } as Transition;
    };

    const renderItem = (item: number) => (
        <motion.div
            key={item}
            initial={{
                y: 0,
            }}
            animate={{
                y: [0, 10, 0],
            }}
            transition={transition(item)}
            className="from-accent_dark to-accent_light size-4 rounded-full bg-gradient-to-t"
        />
    );

    const items = [0, 1, 2];

    return (
        <div
            className={cn(
                "pointer-events-none fixed top-0 left-0 z-[100] flex h-screen w-full items-center justify-center",
                !isScreenProtection && "backdrop-blur-sm",
            )}
        >
            {!isScreenProtection && items.map(renderItem)}
        </div>
    );
};
