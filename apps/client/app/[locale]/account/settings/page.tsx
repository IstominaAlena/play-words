import { Metadata } from "next";

import { SettingsPage } from "@/components/pages/settings-page";

export const metadata: Metadata = {
    title: "Settings",
    description: "",
    keywords: "",
};

const Settings = () => <SettingsPage />;

export default Settings;
