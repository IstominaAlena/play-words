import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { AccountPage } from "@/components/pages/account-page";
import { AccountRoutes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> =>
    createMeta("account_page", AccountRoutes.ACCOUNT);

const Account = () => <AccountPage />;

export default Account;
