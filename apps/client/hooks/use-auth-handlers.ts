import { queryClient, setApiHandlers } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { useRouter } from "@repo/i18n/config/navigation";

import { refresh } from "@/api/auth/endpoints";
import { Routes } from "@/enums/routes";

export const useAuthHandlers = () => {
    const router = useRouter();
    const { clearUser, clearSettings } = useUserStore();

    const handleRefresh = async () => {
        await refresh();
    };

    const handleLogout = () => {
        clearUser();
        clearSettings();
        queryClient.cancelQueries();
        queryClient.removeQueries();
        router.replace(Routes.HOME);
    };

    setApiHandlers({
        onRefresh: handleRefresh,
        onUnauthorized: handleLogout,
    });

    return { handleLogout };
};
