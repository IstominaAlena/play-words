import createdMiddleware from "@repo/i18n/config/base-middleware";

export default createdMiddleware;

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
