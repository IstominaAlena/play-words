"use client";

import { motion } from "motion/react";
import { FC, PropsWithChildren, useEffect, useState } from "react";

import { cn } from "../utils/class-names";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

interface Props {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
    disabled?: boolean;
    isLoading?: boolean;
}

export const HoverBorderGradient: FC<
    PropsWithChildren<Props & React.HTMLAttributes<HTMLElement>>
> = ({
    children,
    containerClassName,
    className,
    as: Tag = "button",
    duration = 1,
    clockwise = true,
    disabled,
    isLoading,
    ...props
}) => {
    const [direction, setDirection] = useState<Direction>("BOTTOM");

    const rotateDirection = (currentDirection: Direction): Direction => {
        const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
            ? (currentIndex - 1 + directions.length) % directions.length
            : (currentIndex + 1) % directions.length;
        return directions[nextIndex] || "LEFT";
    };

    const movingMap: Record<Direction, string> = {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, rgba(6, 214, 160, 1) 0%, rgba(16, 79, 85, 1) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, rgba(6, 214, 160, 1) 0%, rgba(16, 79, 85, 1) 100%)",
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, rgba(6, 214, 160, 1) 0%, rgba(16, 79, 85, 1) 100%)",
        RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, rgba(6, 214, 160, 1) 0%, rgba(16, 79, 85, 1) 100%)",
    };

    useEffect(() => {
        if (isLoading) {
            const interval = setInterval(() => {
                setDirection((prevState) => rotateDirection(prevState));
            }, duration * 1000);
            return () => clearInterval(interval);
        }
    }, [isLoading]);

    return (
        <Tag
            className={cn(
                "group relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center overflow-visible rounded-full border decoration-clone p-px transition duration-500",
                containerClassName,
            )}
            {...props}
        >
            <div className={cn("z-10 w-auto rounded-[inherit]", className)}>{children}</div>
            <motion.div
                className={cn(
                    "absolute inset-0 z-0 h-full w-full flex-none overflow-hidden rounded-[inherit] blur-[2px] transition-all duration-300 group-hover:blur-xs",
                )}
                initial={{ background: movingMap[direction] }}
                animate={
                    disabled
                        ? {}
                        : {
                              background: movingMap[direction],
                          }
                }
                transition={{ ease: "linear", duration: duration ?? 1 }}
            />
        </Tag>
    );
};
