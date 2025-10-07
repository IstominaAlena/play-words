"use client";

import { useEffect, useState } from "react";

const breakpoints = {
    xs: 479,
    sm: 639,
    md: 767,
    lg: 1023,
    xl: 1279,
    "2xl": 1535,
};

const useWindowDimensions = () => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const getSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });

        getSize();
        window.addEventListener("resize", getSize);

        return () => window.removeEventListener("resize", getSize);
    }, []);

    const { width, height } = size;

    return {
        width,
        height,
        isXs: width <= breakpoints.xs,
        isSm: width > breakpoints.xs && width <= breakpoints.sm,
        isMd: width > breakpoints.sm && width <= breakpoints.md,
        isLg: width > breakpoints.md && width <= breakpoints.lg,
        isXl: width > breakpoints.lg && width <= breakpoints.xl,
        is2Xl: width > breakpoints.xl && width <= breakpoints["2xl"],
        isAbove2Xl: width > breakpoints["2xl"],
    };
};

export default useWindowDimensions;
