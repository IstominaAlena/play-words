"use client";

import { FC, SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {
    text: string;
}

export const OutlinedText: FC<Props> = ({ text, ...props }) => (
    <svg viewBox="0 0 300 100" fill="none" width={300} height={100} {...props}>
        <defs>
            <linearGradient id="outline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#104F55" />
                <stop offset="40%" stopColor="#06D6A0" />
                <stop offset="90%" stopColor="#104F55" />
            </linearGradient>
        </defs>

        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke="url(#outline-gradient)"
            strokeWidth="5"
            fill="transparent"
            className="font-[helvetica] text-7xl font-bold"
        >
            {text}
        </text>
    </svg>
);
