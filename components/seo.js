import Head from "next/head";
const Seo = ({ seo }) => {

    return (
        <Head>
            <>
                <title>{seo.metaTitle}</title>
                <meta property="og:title" content={seo.metaTitle} />
                <meta name="twitter:title" content={seo.metaTitle} />
            </>
            <>
                <meta name="description" content={seo.metaDescription} />
                <meta property="og:description" content={seo.metaDescription} />
                <meta name="twitter:description" content={seo.metaDescription} />
            </>
            <>
                <meta property="og:image" content={seo.shareImage} />
                <meta name="twitter:image" content={seo.shareImage} />
                <meta name="image" content={seo.shareImage} />
            </>
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />
            <link rel="shortcut icon" href="/assets/pot.svg" />
        </Head>
    );
};

export default Seo;