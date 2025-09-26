import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Lightweight wrappers around Next.js' navigation
// APIs that consider the routing configuration
// Usage doc: https://next-intl.dev/docs/routing/navigation

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
