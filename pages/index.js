import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {fetchAPI, setLocaleCookie} from "../lib/runtimeLib";
import {fetchImage, generateRss} from "../lib/buildtimeLib";
import Image from "next/image";
import Link from "next/link";

const Home = ({articles, categories, localSeo, pages}) => {
    setLocaleCookie(localSeo.locale);

    return (
        <>
            <Layout categories={categories} pages={pages}>
                <Seo seo={localSeo}/>
                <div
                    className="uk-height-large uk-background-cover uk-flex uk-flex-column uk-flex-right uk-flex-bottom uk-padding-small"
                    data-src={localSeo.shareImage.url} data-srcset={localSeo.shareImage.url} data-uk-img>
                    <h1 className="living uk-heading-medium">{localSeo.metaTitle}</h1>
                    <div className="uk-child-width-auto" uk-grid="true">
                        <div>
                            <a href="//instagram.com/gani.raa/" target="_blank" rel="noopener noreferrer"
                               uk-tooltip="instagram.com/gani.raa">
                                <Image
                                    src="/instagram.svg"
                                    alt="instagram.com/gani.raa/"
                                    width="30"
                                    height="30"
                                />
                            </a>
                        </div>
                        <div>
                            <a href="//linkedin.com/in/ganira/" target="_blank" rel="noopener noreferrer"
                               uk-tooltip="linkedin.com/in/ganira">
                                <Image
                                    src="/linkedin.svg"
                                    alt="linkedin.com/in/ganira/"
                                    width="30"
                                    height="30"
                                />
                            </a>
                        </div>
                        <div>
                            <a href="mailto:contact@ganira.net" uk-tooltip="contact@ganira.net">
                                <Image
                                    src="/email.svg"
                                    alt="contact@ganira.net"
                                    width="30"
                                    height="30"
                                />
                            </a>
                        </div>
                        <div>
                            <Link href={`/feed/rss-${localSeo.locale}.xml`}>
                                <a uk-tooltip="RSS">
                                    <Image
                                        src="/rss.svg"
                                        alt="rss"
                                        width="30"
                                        height="30"
                                    />
                                </a>
                            </Link>
                        </div>
                    </div>

                </div>
                <div className="uk-section">
                    <div className="uk-container uk-container-medium">
                        <Articles articles={articles}/>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export async function getStaticProps({locale}) {
    // Run API calls in parallel
    const [allArticles, global, pages] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI("/global"),
        fetchAPI(`/pages?locale=${locale}`),
    ]);

    const articles = allArticles
        .filter((article) => article.category.locale === locale)
        .sort((a, b) => (a.published_at < b.published_at) ? 1 : -1);

    const categories = [...new Map(articles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    const localSeo = global.defaultSeo.filter((seo) => seo.locale === locale)[0];

    await fetchImage(localSeo.shareImage.url);

    for (const article of articles) {
        const images = article.content.match(/]\(\/uploads\/(.*?)\)/g);
        if (images) {
            for (const image of images) {
                await fetchImage(image.substr(2).slice(0, -1))
            }
        }

        await fetchImage(article.image.url);
        await fetchImage(article.writer.picture.url);
    }

    for (const page of pages) {
        await fetchImage(page.image.url);
    }

    await generateRss(articles, localSeo, locale);

    return {
        props: {articles, categories, localSeo, pages}
    };
}

export default Home