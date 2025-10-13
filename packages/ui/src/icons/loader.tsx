"use client";

import { FC, SVGProps } from "react";

export const LoaderIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 32 32" fill="none" width={32} height={32} {...props}>
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#104F55" />
                <stop offset="40%" stopColor="#06D6A0" />
                <stop offset="90%" stopColor="#104F55" />
            </linearGradient>
        </defs>

        <path
            d="M16 0c-8.711 0-15.796 6.961-15.995 15.624 0.185-7.558 5.932-13.624 12.995-13.624 7.18 0 13 6.268 13 14 0 1.657 1.343 3 3 3s3-1.343 3-3c0-8.837-7.163-16-16-16zM16 32c8.711 0 15.796-6.961 15.995-15.624-0.185 7.558-5.932 13.624-12.995 13.624-7.18 0-13-6.268-13-14 0-1.657-1.343-3-3-3s-3 1.343-3 3c0 8.837 7.163 16 16 16z"
            fill="url(#gradient)"
        ></path>
    </svg>
);
