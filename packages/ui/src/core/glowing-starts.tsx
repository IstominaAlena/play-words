"use client";

import { AnimatePresence, motion } from "motion/react";
import { FC, memo, useEffect, useRef, useState } from "react";

import { cn } from "../utils/class-names";

interface Props {
    mouseEnter?: boolean;
}

export const GlowingStarsBackground: FC<Props> = ({ mouseEnter }) => {
    const stars = 30;
    const columns = 30;

    const [glowingStars, setGlowingStars] = useState<number[]>([]);

    const highlightedStars = useRef<number[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            highlightedStars.current = Array.from({ length: 5 }, () =>
                Math.floor(Math.random() * stars),
            );
            setGlowingStars([...highlightedStars.current]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="absolute top-0 left-0 h-full w-full p-1"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `1px`,
            }}
        >
            {[...Array(stars)].map((_, starIdx) => {
                const isGlowing = glowingStars.includes(starIdx);
                const delay = (starIdx % 10) * 0.1;
                const staticDelay = starIdx * 0.01;
                return (
                    <div
                        key={`matrix-col-${starIdx}}`}
                        className="relative flex items-center justify-center"
                    >
                        <Star
                            isGlowing={mouseEnter ? true : isGlowing}
                            delay={mouseEnter ? staticDelay : delay}
                        />
                        {mouseEnter && <Glow delay={staticDelay} />}
                        <AnimatePresence mode="wait">
                            {isGlowing && <Glow delay={delay} />}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
};

interface StarProps {
    isGlowing: boolean;
    delay: number;
}

const Star = memo<StarProps>(({ isGlowing, delay }: StarProps) => (
    <motion.div
        key={delay}
        initial={{
            scale: 1,
        }}
        animate={{
            scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
            background: isGlowing ? "#ebebeb" : "rgba(235, 235, 235, 0.1)",
        }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            delay: delay,
        }}
        className={cn("bg-[rgba(235, 235, 235, 0.1)] relative z-20 h-[1px] w-[1px] rounded-full")}
    ></motion.div>
));

Star.displayName = "Star";

interface GlowProps {
    delay: number;
}

const Glow = memo<GlowProps>(({ delay }: GlowProps) => (
    <motion.div
        initial={{
            opacity: 0,
        }}
        animate={{
            opacity: 1,
        }}
        transition={{
            duration: 2,
            ease: "easeInOut",
            delay: delay,
        }}
        exit={{
            opacity: 0,
        }}
        className="bg-accent_light shadow-accent_dark absolute left-1/2 z-10 h-[4px] w-[4px] -translate-x-1/2 rounded-full shadow-2xl blur-[1px]"
    />
));

Glow.displayName = "Glow";
