import createdMiddleware from "@repo/i18n/config/base-middleware";
import { NextRequest, NextResponse } from "next/server";
import { ProtectedRoutes } from "./enums/routes";
import { LOCALES } from "@repo/common/constants/common";
import { SupportedLanguages } from "@repo/common/enums/common";

export default createdMiddleware;

export async function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const path = url.pathname;

    const parts = path.split("/").filter(Boolean);
    const token = req.cookies.get("access_token")?.value ?? null;

    const protectedRoutes = Object.values(ProtectedRoutes);
    const locale = parts.find((part) => LOCALES.includes(part as SupportedLanguages));

    const isProtected = protectedRoutes.some(route => path.includes(route));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
