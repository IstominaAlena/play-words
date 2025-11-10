import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { SettingsPage } from "@/components/pages/settings-page";
import { AccountRoutes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> =>
    createMeta("settings_page", AccountRoutes.SETTINGS);

const Settings = () => <SettingsPage />;

export default Settings;
