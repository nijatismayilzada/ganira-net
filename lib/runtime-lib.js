import { useCookies } from "react-cookie";

export function setLocaleCookie(locale) {
    const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);

    setCookie("NEXT_LOCALE", locale, {
        path: `/`,
        maxAge: 100 * 24 * 60 * 60,
        sameSite: true,
    })
}