import { Metadata } from "next";

import { ResetPasswordRequestPage } from "@/components/pages/reset-password-request-page";

export const metadata: Metadata = {
    title: "Reset Password Request",
    description: "",
    keywords: "",
};

const ResetPasswordRequest = () => <ResetPasswordRequestPage />;

export default ResetPasswordRequest;
