import { Messages } from "./common";

declare module "express-serve-static-core" {
    interface Request {
        messages: ReturnType<Messages>;
    }
}
