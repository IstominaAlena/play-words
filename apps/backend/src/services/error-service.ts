import { Messages } from "@/types/common";

export class AppError extends Error {
    statusCode: number;
    messageKey?: keyof Messages;
    fields?: Record<string, string>;

    constructor(
        statusCode: number,
        messageKey?: keyof Messages,
        message?: string,
        fields?: Record<string, string>,
    ) {
        super(message || messageKey);
        this.statusCode = statusCode;
        this.messageKey = messageKey;
        this.fields = fields;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
