import {useCookies} from "react-cookie";

export function getStrapiURL(path = "") {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl);
    return await response.json();
}

export function setLocaleCookie(locale) {
    const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);

    setCookie("NEXT_LOCALE", locale, {
        path: `/`,
        maxAge: 100 * 24 * 60 * 60,
        sameSite: true,
    })
}