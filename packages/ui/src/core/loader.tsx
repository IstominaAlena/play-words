"use client";

import { Transition, motion } from "motion/react";
import { FC } from "react";

import { cn } from "../utils/class-names";

interface Props {
    size: "default" | "small";
}

const sizes = {
    default: "size-4",
    small: "size-2",
};

export const Loader: FC<Props> = ({ size = "default" }) => {
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
            className={cn(
                "from-accent_dark to-accent_light rounded-full bg-gradient-to-t",
                sizes[size],
            )}
        />
    );

    const items = [0, 1, 2];

    return items.map(renderItem);
};
