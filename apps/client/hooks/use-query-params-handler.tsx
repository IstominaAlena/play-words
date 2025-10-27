"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { showToast } from "@repo/ui/core/sonner";

import { useModal } from "@repo/common/hooks/use-modal.tsx";
import { useRouter } from "@repo/i18n/config/navigation";

import { OtpModal } from "@/components/auth/otp-modal";
import { Routes } from "@/enums/routes";

interface UseQueryParamsHandlerProps {
    openModal: ReturnType<typeof useModal>["openModal"];
    closeModal: ReturnType<typeof useModal>["closeModal"];
}

export const useQueryParamsHandler = ({ openModal, closeModal }: UseQueryParamsHandlerProps) => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const isOtp = searchParams.get("otp") ?? false;
    const email = searchParams.get("email") ?? "";
    const error = searchParams.get("error");

    useEffect(() => {
        if (isOtp) {
            openModal(<OtpModal closeModal={closeModal} email={email} />);
        }
    }, [isOtp, email]);

    useEffect(() => {
        if (!error) return;

        const timer = setTimeout(() => {
            showToast.error(error);

            router.replace(Routes.HOME);
        }, 50);

        return () => clearTimeout(timer);
    }, [error, router]);
};
