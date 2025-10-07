import { Metadata } from "next";

import { ResetPasswordPage } from "@/components/pages/reset-password-page";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "",
    keywords: "",
};

const ResetPassword = () => <ResetPasswordPage />;

export default ResetPassword;
