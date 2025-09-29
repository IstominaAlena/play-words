import fs from "fs";
import path from "path";

import { SupportedLanguages } from "@repo/common/enums/common";

export interface BackendMessages {
    USER_NOT_FOUND: string;
    INTERNAL_ERROR: string;
    [key: string]: string;
}

export function getBackendMessages(lang: SupportedLanguages): BackendMessages {
    const filePath = path.join(__dirname, "messages", `${lang}.json`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`No messages found for locale: ${lang}`);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as BackendMessages;
}
