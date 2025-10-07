import { deleteCookie, getCookie, setCookie } from "cookies-next";

import { ACCESS_TOKEN_KEY } from "../constants/common";

export const getClientCookieDomain = (): string | undefined => {
    if (typeof window === "undefined") return undefined;

    const hostname = window.location.hostname;

    return `.${hostname}`;
};

export const saveAccessToken = (token: string) => {
    const domain = getClientCookieDomain();

    setCookie(ACCESS_TOKEN_KEY, token, { domain });
};

export const getAccessToken = () => {
    const domain = getClientCookieDomain();

    return getCookie(ACCESS_TOKEN_KEY, { domain });
};

export const deleteAccessToken = () => {
    const domain = getClientCookieDomain();
    deleteCookie(ACCESS_TOKEN_KEY, { domain });
};
