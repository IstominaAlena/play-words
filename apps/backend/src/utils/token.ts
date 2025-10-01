import crypto from "crypto";
import jwt from "jsonwebtoken";

import { ACCESS_TOKEN_EXP, JWT_SECRET } from "@/constants/common";

export const generateRandomToken = (len = 64) => crypto.randomBytes(len).toString("hex");

export const hashToken = (token: string) => crypto.createHash("sha256").update(token).digest("hex");

export const generateAccessToken = (id: string | number, email: string) => {
    const jti = crypto.randomUUID(); // unique token identifier
    return jwt.sign({ sub: id, email, jti }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXP });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, JWT_SECRET);
};
