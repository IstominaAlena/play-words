import { Metadata } from "next";

import { DictionaryPage } from "@/components/pages/dictionary-page";

export const metadata: Metadata = {
    title: "Dictionary",
    description: "",
    keywords: "",
};

const Dictionary = () => <DictionaryPage />;

export default Dictionary;
