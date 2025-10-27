"use client";

import { FC, SVGProps } from "react";

export const ErrorIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 32 32" fill="none" width={32} height={32} {...props}>
        <defs>
            <linearGradient id="gradient-error" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#800516" />
                <stop offset="40%" stopColor="#E60A0C" />
                <stop offset="90%" stopColor="#800516" />
            </linearGradient>
        </defs>

        <path
            d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"
            fill="url(#gradient-error)"
        ></path>
        <path
            d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"
            fill="url(#gradient-error)"
        ></path>
    </svg>
);
