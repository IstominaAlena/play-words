import { FC } from "react";

import { AppearanceSettings } from "../account/appearance-settings";
import { OtherSettings } from "../account/other-settings";

export const SettingsPage: FC = () => (
    <div className="flex h-full gap-6 lg:flex-col">
        <AppearanceSettings className="flex-1" />
        <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
        <OtherSettings className="flex-1" />
    </div>
);
