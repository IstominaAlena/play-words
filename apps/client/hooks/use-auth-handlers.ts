import { useRouter } from "next/navigation";

import { queryClient, setApiHandlers } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";

import { useGetCurrentUser } from "@/api/account/mutations";
import { refresh } from "@/api/auth/endpoints";
import { Routes } from "@/enums/routes";

export const useAuthHandlers = () => {
    const router = useRouter();

    const { clearUser, clearToken, saveToken } = useUserStore();

    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    const handleRefresh = async () => {
        try {
            const data = await refresh();
            if (data) {
                saveToken(data);

                await getCurrentUser();

                return data;
            }

            return null;
        } catch {
            return null;
        }
    };

    const handleLogout = () => {
        clearUser();
        clearToken();
        queryClient.cancelQueries();
        queryClient.removeQueries();
        router.replace(Routes.HOME);
    };

    // Register the handlers globally (called once in _app or layout)
    setApiHandlers({
        onRefreshToken: handleRefresh,
        onUnauthorized: handleLogout,
    });

    return { handleLogout, handleRefresh };
};
