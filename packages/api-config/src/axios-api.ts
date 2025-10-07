import axios from "axios";

import { getAccessToken } from "@repo/common/config/client-storage";

export const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Handlers that frontend will register
let onRefreshToken: (() => Promise<string | null>) | null = null;
let onUnauthorized: (() => void) | null = null;

export const setApiHandlers = (handlers: {
    onRefreshToken?: () => Promise<string | null>;
    onUnauthorized?: () => void;
}) => {
    onRefreshToken = handlers.onRefreshToken || null;
    onUnauthorized = handlers.onUnauthorized || null;
};

// Helper to broadcast new token to all waiting requests
const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

// Request interceptor
api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;

        if (response?.status === 401 && !config._retry && !config.url?.includes("/users/refresh")) {
            if (isRefreshing) {
                // Wait for refresh
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        config.headers.Authorization = `Bearer ${token}`;
                        resolve(api(config));
                    });
                });
            }

            config._retry = true;
            isRefreshing = true;

            try {
                if (!onRefreshToken) throw new Error("No refresh handler registered");

                const newToken = await onRefreshToken();

                if (newToken) {
                    onTokenRefreshed(newToken);
                    config.headers.Authorization = `Bearer ${newToken}`;
                    return api(config);
                } else {
                    throw new Error("Token refresh failed");
                }
            } catch {
                onUnauthorized?.();
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
