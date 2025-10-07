"use client";

import { FC } from "react";

import { ChangePassword } from "../account/change-password";
import { ConnectOtherAccounts } from "../account/connect-other-accounts";
import { EditUser } from "../account/edit-user";
import { Security } from "../account/security";

export const AccountPage: FC = () => {
    return (
        <section className="flex h-full flex-col gap-6">
            <div className="flex h-full gap-6 lg:flex-col">
                <div className="flex flex-1 flex-col justify-between gap-6">
                    <EditUser />
                    <ConnectOtherAccounts />
                </div>
                <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
                <div className="flex flex-1 flex-col justify-between gap-6">
                    <ChangePassword />
                    <Security />
                </div>
            </div>
        </section>
    );
};
