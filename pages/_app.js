import App from "next/app";
import Head from "next/head";
import "../styles/style.css";
import React, {createContext, useEffect} from "react";
import {fetchAPI} from "../lib/runtimeLib";
import * as gtag from "../lib/gtag";
import {useRouter} from 'next/router';
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import 'uikit/dist/css/uikit.css';

// Store Strapi Global object in context
export const GlobalContext = createContext({});

const MyApp = ({Component, pageProps}) => {
    UIkit.use(Icons);
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    const {global} = pageProps;

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/glogo.png"/>
            </Head>
            <GlobalContext.Provider value={global}>
                <Component {...pageProps} />
            </GlobalContext.Provider>
        </>
    );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
    // Calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(ctx);
    // Fetch global site settings from Strapi
    const global = await fetchAPI("/global");
    // Pass the data to our page via props
    return {...appProps, pageProps: {global}};
};

export default MyApp;