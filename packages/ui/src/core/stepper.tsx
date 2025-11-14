import { FC, useRef } from "react";

import { GlowingContainer } from "./glowing-container";

interface Props {
    steps: number;
    currentStep: number;
}

export const Stepper: FC<Props> = ({ steps, currentStep }) => {
    const ref = useRef<HTMLUListElement | null>(null);

    const width = ref.current?.getBoundingClientRect().width ?? 0;
    const separatorWidth = width / (steps - 1) - 20;

    const stepsArray = Array.from({ length: steps }, (_, i) => (
        <li key={i} className="bg-primary_bg relative h-10 w-10 rounded-full">
            <GlowingContainer
                contentClassName="px-2 bg-secondary_bg"
                variant={i === currentStep ? "WARN" : "NEUTRAL"}
            >
                {i + 1}
            </GlowingContainer>
            {i < steps - 1 && (
                <span
                    className="bg-horizontal_neutral_gradient absolute top-1/2 left-full h-px"
                    style={{ width: separatorWidth }}
                />
            )}
        </li>
    ));

    return (
        <ul ref={ref} className="flex w-full items-center justify-between">
            {stepsArray}
        </ul>
    );
};
