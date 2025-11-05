"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
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
    return (
        <div className="mt-6 flex items-center justify-center gap-2">
            <button
                onClick={fetchPreviousPage}
                disabled={!hasPreviousPage}
                className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    !hasPreviousPage ? "cursor-not-allowed opacity-50" : "hover:bg-ghost",
                )}
            >
                <ChevronLeft
                    size={24}
                    className={!hasPreviousPage ? "text-neutral" : "text-accent_light"}
                />
            </button>

            {isLoading ? (
                <Skeleton className="h-6 w-10" />
            ) : (
                <span className="text-neutral px-3 py-1.5 text-lg font-medium">
                    {currentPage}/{totalPages}
                </span>
            )}

            <button
                onClick={fetchNextPage}
                disabled={!hasNextPage}
                className={cn(
                    "flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                    !hasNextPage ? "cursor-not-allowed opacity-50" : "hover:bg-ghost",
                )}
            >
                <ChevronRight
                    size={24}
                    className={!hasNextPage ? "text-neutral" : "text-accent_light"}
                />
            </button>
        </div>
    );
};
