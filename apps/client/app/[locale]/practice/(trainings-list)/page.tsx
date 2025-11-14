import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { PracticePage } from "@/components/pages/practice-page";
import { Routes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> =>
    createMeta("practice_page", Routes.PRACTICE);

const Practice = () => <PracticePage />;

export default Practice;
