import { Metadata } from "next";

import { AccountPage } from "@/components/pages/account-page";

export const metadata: Metadata = {
    title: "Account",
    description: "",
    keywords: "",
};

const Account = () => <AccountPage />;

export default Account;
