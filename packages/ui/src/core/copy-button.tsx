"use client";

import { CheckIcon, CopyIcon, Loader } from "lucide-react";
import { FC, useState } from "react";

import { cn } from "../utils/class-names";
import { GhostButton } from "./button";

interface Props {
    value: string;
    buttonClassName?: string;
    text?: string;
    iconSize?: number;
}

type CopyStatus = "idle" | "loading" | "copied";

export const CopyButton: FC<Props> = ({ value, buttonClassName, text, iconSize = 14 }) => {
    const [status, setStatus] = useState<CopyStatus>("idle");

    const handleCopy = async () => {
        try {
            setStatus("loading");

            await navigator.clipboard.writeText(value);

            setTimeout(() => {
                setStatus("copied");

                setTimeout(() => {
                    setStatus("idle");
                }, 600);
            }, 600);
        } catch (err) {
            setStatus("idle");
            throw new Error("Copy failed");
        }
    };

    const renderIcon = () => {
        switch (status) {
            case "loading":
                return <Loader className="animate-spin" />;
            case "copied":
                return <CheckIcon className="text-accent" width={iconSize} height={iconSize} />;
            default:
                return <CopyIcon width={iconSize} height={iconSize} />;
        }
    };

    return (
        <GhostButton
            className={cn(
                "text-accent h-6 items-center justify-center gap-1",
                (status === "loading" || status === "copied") && "pointer-events-none",
                buttonClassName,
            )}
            onClick={handleCopy}
            aria-label={text ?? "share"}
        >
            <div className="flex w-6 items-center justify-center">{renderIcon()}</div>
            {text}
        </GhostButton>
    );
};
