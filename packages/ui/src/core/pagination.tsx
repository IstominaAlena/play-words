"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";

import { Skeleton } from "./skeleton";

interface InfinitePaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    fetchNextPage: () => void;
    fetchPreviousPage: () => void;
    isLoading?: boolean;
}

export const Pagination: FC<InfinitePaginationProps> = ({
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    isLoading,
}) => {
    const t = useTranslations("aria");

    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            <button
                aria-label={t("pagination_prev")}
                onClick={fetchPreviousPage}
                disabled={!hasPreviousPage}
                className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    !hasPreviousPage
                        ? "text-neutral/50 cursor-not-allowed"
                        : "text-secondary_text hover:text-primary_text",
                )}
            >
                <ChevronLeft size={24} />
            </button>

            {isLoading ? (
                <Skeleton className="h-6 w-10" />
            ) : (
                <span className="text-secondary_text px-3 py-1.5 text-lg font-medium">
                    {currentPage}/{totalPages}
                </span>
            )}

            <button
                aria-label={t("pagination_next")}
                onClick={fetchNextPage}
                disabled={!hasNextPage}
                className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    !hasNextPage
                        ? "text-neutral/50 cursor-not-allowed"
                        : "text-secondary_text hover:text-primary_text",
                )}
            >
                <ChevronRight size={24} />
            </button>
        </div>
    );
};
