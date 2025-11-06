"use client";

import { motion } from "motion/react";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import { cn } from "../utils/class-names";
import { HoverBorderGradient } from "./hover-border-gradient";

interface Option<T extends string> {
    label: string;
    value: T;
    icon?: ReactNode;
}

interface Props<T extends string> {
    options: Option<T>[];
    selected: T;
    setSelected: Dispatch<SetStateAction<T>>;
}

export const SliderToggle = <T extends string>({ options, selected, setSelected }: Props<T>) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const buttonsRef = useRef<HTMLButtonElement[]>([]);

    const [leftPx, setLeftPx] = useState<number | null>(null);
    const [widthPx, setWidthPx] = useState<number>(0);

    const selectedIndex = Math.max(
        0,
        options.findIndex((o) => o.value === selected),
    );

    const measure = useCallback(() => {
        const container = containerRef.current;
        const btn = buttonsRef.current[selectedIndex];
        if (!container || !btn) return;

        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const centerRelativeToContainer = btnRect.left - containerRect.left + btnRect.width / 2;

        setLeftPx(centerRelativeToContainer);
        setWidthPx(btnRect.width);
    }, [selectedIndex]);

    useLayoutEffect(() => {
        measure();

        const container = containerRef.current;
        if (!container) return;

        const ro = new ResizeObserver(() => measure());
        ro.observe(container);
        buttonsRef.current.forEach((b) => b && ro.observe(b));

        return () => ro.disconnect();
    }, [selected, options.length, measure]);

    const onOptionClick = (value: T) => () => setSelected(value);

    const renderOption = ({ value, label, icon }: Option<T>, i: number) => (
        <button
            key={value}
            ref={(el) => {
                if (el) buttonsRef.current[i] = el;
            }}
            className={cn(
                "relative z-20 flex h-10 w-full items-center justify-center gap-2 rounded-full px-4 text-base font-medium transition-colors",
                selected === value ? "text-primary_text" : "text-neutral",
            )}
            onClick={onOptionClick(value)}
        >
            {icon}
            <span>{label}</span>
        </button>
    );

    return (
        <div
            ref={containerRef}
            className="bg-ghost relative flex w-full items-center gap-1 rounded-full"
        >
            {options.map(renderOption)}

            {leftPx !== null && (
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
