import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true,
});

// --- Global handlers ---
let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

// Handlers that frontend will register
let onRefresh: (() => Promise<void>) | null = null;
let onUnauthorized: (() => void) | null = null;

// Register handlers from frontend (called in _app or layout)
export const setApiHandlers = (handlers: {
    onRefresh?: () => Promise<void>;
    onUnauthorized?: () => void;
}) => {
    onRefresh = handlers.onRefresh || null;
    onUnauthorized = handlers.onUnauthorized || null;
};

// Subscribe for pending requests while refreshing
const subscribeRefresh = (cb: () => void) => refreshSubscribers.push(cb);

// Notify all subscribers when refresh is done
const onRefreshed = () => {
    refreshSubscribers.forEach((cb) => cb());
    refreshSubscribers = [];
};

// --- Request interceptor ---
api.interceptors.request.use(
    (config) => {
        // No Authorization header needed: cookies are sent automatically
        return config;
    },
    (error) => Promise.reject(error),
);

// --- Response interceptor ---
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;

        // Only handle 401 and avoid infinite loop
        if (response?.status === 401 && !config._retry && !config.url?.includes("/users/refresh")) {
            if (isRefreshing) {
                // Wait for the refresh to finish
                return new Promise((resolve) => {
                    subscribeRefresh(() => resolve(api(config)));
                });
            }

            config._retry = true;
            isRefreshing = true;

            try {
                if (!onRefresh) throw new Error("No refresh handler registered");

                await onRefresh(); // backend refresh using cookies
                onRefreshed();

                return api(config); // retry original request
            } catch {
                // Refresh failed → log out
                onUnauthorized?.();
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
