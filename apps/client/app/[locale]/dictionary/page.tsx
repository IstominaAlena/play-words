import { Metadata } from "next";

import { createMeta } from "@repo/common/utils/seo";

import { DictionaryPage } from "@/components/pages/dictionary-page";
import { Routes } from "@/enums/routes";

export const generateMetadata = async (): Promise<Metadata> =>
    createMeta("dictionary_page", Routes.DICTIONARY);

const Dictionary = () => <DictionaryPage />;

export default Dictionary;
