"use client";

import { FC, SVGProps } from "react";

export const MenuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 24 24" fill="none" width={32} height={32} {...props}>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#104F55" />
                <stop offset="40%" stopColor="#06D6A0" />
                <stop offset="90%" stopColor="#104F55" />
            </linearGradient>
        </defs>

        <path
            fill="url(#gradient)"
            d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1Zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1ZM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1Z"
        />
    </svg>
);
