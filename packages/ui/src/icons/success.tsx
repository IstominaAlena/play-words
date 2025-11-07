"use client";

import { FC, SVGProps } from "react";

export const SuccessIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 32 32" fill="none" width={32} height={32} {...props}>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent_dark)" />
                <stop offset="40%" stopColor="var(--accent_light)" />
                <stop offset="90%" stopColor="var(--accent_dark)" />
            </linearGradient>
        </defs>
        <path
            d="M32 16c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zM3 16c0-7.18 5.82-13 13-13s13 5.82 13 13-5.82 13-13 13-13-5.82-13-13z"
            fill="url(#gradient)"
        ></path>
        <path
            d="M9.914 11.086l-2.829 2.829 8.914 8.914 8.914-8.914-2.828-2.828-6.086 6.086z"
            fill="url(#gradient)"
        ></path>
    </svg>
);
