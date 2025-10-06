"use client";

import { motion } from "motion/react";
import { FC } from "react";

import { cn } from "../utils/class-names";

interface Props {
    number?: number;
    className?: string;
}

export const Meteors: FC<Props> = ({ number, className }) => {
    const meteors = new Array(number || 20).fill(true);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {meteors.map((el, idx) => {
                const meteorCount = number || 20;
                // Calculate position to evenly distribute meteors across container width
                const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered

                return (
                    <span
                        key={"meteor" + idx}
                        className={cn(
                            "animate-meteor-effect bg-accent_light w-0.3 absolute h-0.5 rotate-[45deg] rounded-[9999px] shadow-[0_0_0_1px_#104F5510]",
                            "before:from-accent_dark before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:to-transparent before:content-['']",
                            "after:from-secondary_light before:content-[''] after:absolute after:top-1/2 after:h-[1px] after:w-[50px] after:-translate-y-[50%] after:transform after:bg-gradient-to-r after:to-transparent after:blur-xs",
                            className,
                        )}
                        style={{
                            top: "-40px", // Start above the container
                            left: position + "px",
                            animationDelay: Math.random() * 5 + "s", // Random delay between 0-5s
                            animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + "s", // Keep some randomness in duration
                        }}
                    ></span>
                );
            })}
        </motion.div>
    );
};
