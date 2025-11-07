"use client";

import { FC } from "react";
import QRCode from "react-qr-code";

import { GlowingContainer } from "./glowing-container";

interface Props {
    value: string;
    size?: number;
}

export const QrCode: FC<Props> = ({ value, size = 256 }) => (
    <GlowingContainer containerClassName="rounded-lg w-fit" contentClassName="bg-secondary_bg py-4">
        <QRCode value={value} size={size} />
    </GlowingContainer>
);
