import type { Messages } from "@/types/common";
import fs from "fs";
import path from "path";

import { SupportedLanguages } from "@repo/common/enums/common";

export function getBackendMessages(lang: SupportedLanguages): Messages {
    const filePath = path.join(process.cwd(), "src/messages", `${lang}.json`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`No messages found for locale: ${lang}, checked path: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(content) as Messages;
}
