// const logout = () => {
//     deleteToken();
//     deleteRefreshToken();
//     deleteUserType();
//     window.location.href = Route.HOME;
// };
import axios from "axios";

import { getAccessToken } from "@repo/common/config/client-storage";

export const api = axios.create({
    baseURL: process.env.API_URL,
});

api.interceptors.request.use(
    (config) => {
        const token = getAccessToken();

        if (!config.headers.Authorization && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    config: any;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.config.headers.Authorization = `Bearer ${token}`;
            prom.resolve(api(prom.config));
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest?.url?.includes("/users/refresh") && error.response?.status === 401) {
            // logout();
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && error.response?.data?.message === "TOKEN_EXPIRED") {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject, config: originalRequest });
                });
            }

            isRefreshing = true;

            try {
                // const refreshToken = readRefreshToken();
                // if (!refreshToken) throw new Error("No refresh token");
                // const { data } = await refreshUser({ Authorization: `Bearer ${refreshToken}` });
                // const newAccessToken = data?.accessToken?.token;
                // if (!newAccessToken) throw new Error("No access token returned");
                // useAuthStore.getState().setToken(newAccessToken, data.accessToken.expiresAt);
                // if (data.refreshToken) {
                //     useAuthStore
                //         .getState()
                //         .setRefreshToken(data.refreshToken.token, data.refreshToken.expiresAt);
                // }
                // processQueue(null, newAccessToken);
                // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                // return api(originalRequest);
            } catch (err) {
                processQueue(err, null);

                // logout();

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
