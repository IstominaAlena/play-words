"use client";

import { motion } from "motion/react";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, useState } from "react";

import { cn } from "../utils/class-names";
import { HoverBorderGradient } from "./hover-border-gradient";

interface Option {
    label?: string;
    value: string;
    icon?: ReactNode;
}

interface Props {
    options: Option[];
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
    isDisabled?: boolean;
}

export const SliderToggle: FC<Props> = ({ options, selected, setSelected, isDisabled }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonsRef = useRef<HTMLButtonElement[]>([]);

    const leftRef = useRef<number>(0);
    const widthRef = useRef<number>(0);

    const [leftPx, setLeftPx] = useState<number | null>(null);
    const [widthPx, setWidthPx] = useState<number>(0);

    const selectedIndex = Math.max(
        0,
        options.findIndex((o) => o.value === selected),
    );

    const measure = () => {
        const container = containerRef.current;
        const btn = buttonsRef.current[selectedIndex];
        if (!container || !btn) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const newLeft = btnRect.left - containerRect.left + btnRect.width / 2;
        const newWidth = btnRect.width;

        if (leftRef.current !== newLeft) {
            leftRef.current = newLeft;
            setLeftPx(newLeft);
        }

        if (widthRef.current !== newWidth) {
            widthRef.current = newWidth;
            setWidthPx(newWidth);
        }
    };

    const onOptionClick = (value: string) => () => setSelected(value);

    const renderOption = ({ value, label, icon }: Option, i: number) => (
        <button
            key={value}
            ref={(el) => {
                if (el) buttonsRef.current[i] = el;
            }}
            className={cn(
                "relative z-20 flex h-10 w-full items-center justify-center gap-2 rounded-full px-4 text-base font-medium transition-colors md:px-2",
                selected === value ? "text-primary_text" : "text-neutral",
            )}
            onClick={onOptionClick(value)}
        >
            {icon}
            {label && <span>{label}</span>}
        </button>
    );

    useEffect(() => {
        measure();
    }, [selected, options.length]);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const ro = new ResizeObserver(() => measure());

        ro.observe(container);
        buttonsRef.current.forEach((btn) => btn && ro.observe(btn));

        return () => ro.disconnect();
    }, [options.length]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "bg-ghost relative flex w-full items-center gap-1 rounded-full py-1",
                isDisabled && "pointer-events-none cursor-not-allowed opacity-50",
            )}
        >
            {options.map(renderOption)}

            {leftPx !== null && widthPx > 0 && (
                <motion.div
                    layout
                    transition={{ type: "spring", damping: 30, stiffness: 250 }}
                    className="absolute top-0 bottom-0 rounded-full"
                    style={{
                        left: `${leftPx - widthPx / 2}px`,
                        width: `${widthPx}px`,
                        pointerEvents: "none",
                    }}
                >
                    <HoverBorderGradient
                        containerClassName="rounded-full w-full h-full"
                        className="bg-secondary_bg"
                        variant="SUCCESS"
                    />
                </motion.div>
            )}
        </div>
    );
};
