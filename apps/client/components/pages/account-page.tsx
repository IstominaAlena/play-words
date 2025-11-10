import { FC } from "react";

import { ConnectOtherAccounts } from "../account/connect-other-accounts";
import { EditUser } from "../account/edit-user";

export const AccountPage: FC = () => (
    <div className="flex h-full gap-6 lg:flex-col">
        <EditUser className="flex-1" />
        <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient h-full w-px lg:h-px lg:w-full" />
        <ConnectOtherAccounts className="flex-1" />
    </div>
);
