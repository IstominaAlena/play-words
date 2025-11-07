"use client";

import { FC } from "react";

import { ChangePassword } from "../account/change-password";
import { Security } from "../account/security";

export const SecurityPage: FC = () => (
    <div className="flex h-full gap-6 lg:flex-col">
        <ChangePassword className="flex-1" />
        <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
        <Security className="flex-1" />
    </div>
);
