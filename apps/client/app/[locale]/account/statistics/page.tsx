import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { UnderConstructionPage } from "@/components/pages/under-construction-page";
import { AccountRoutes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> =>
    createMeta("account_page", AccountRoutes.STATISTICS);

const Statistics = () => <UnderConstructionPage />;

export default Statistics;
