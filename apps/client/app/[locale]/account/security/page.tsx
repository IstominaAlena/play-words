import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { SecurityPage } from "@/components/pages/security-page";
import { AccountRoutes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> =>
    createMeta("security_page", AccountRoutes.SECURITY);

const Security = () => <SecurityPage />;

export default Security;
