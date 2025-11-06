import { FC } from "react";

import { ChangePassword } from "../account/change-password";
import { ConnectOtherAccounts } from "../account/connect-other-accounts";
import { EditUser } from "../account/edit-user";
import { Security } from "../account/security";
import { AppearanceSettings } from "./appearance-settings";

export const AccountTab: FC = () => (
    <div className="flex h-full gap-6 lg:flex-col">
        <EditUser className="flex-1" />
        <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
        <ConnectOtherAccounts className="flex-1" />
    </div>
);

export const SecurityTab: FC = () => (
    <div className="flex h-full gap-6 lg:flex-col">
        <ChangePassword className="flex-1" />
        <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
        <Security className="flex-1" />
    </div>
);

export const SettingsTab: FC = () => (
    <div className="flex h-full gap-6 lg:flex-col">
        <AppearanceSettings className="flex-1" />
        <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
        <div className="flex-1" />
    </div>
);
