import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {fetchAPI} from "../lib/runtimeLib";
import {fetchImage} from "../lib/buildtimeLib";
import Image from "next/image";

const Home = ({articles, categories, localSeo, pages}) => {
    return (
        <>
            <Layout categories={categories} pages={pages}>
                <Seo seo={localSeo}/>
                <div className="uk-height-large uk-background-cover uk-flex uk-flex-column uk-flex-right uk-flex-bottom uk-padding-small"
                    data-src={localSeo.shareImage.url} data-srcset={localSeo.shareImage.url} data-uk-img>
                    <h1 className="living uk-heading-medium">{localSeo.metaTitle}</h1>
                    <div className="uk-child-width-auto" uk-grid="true">
                        <div>
                            <a href="//instagram.com/gani.raa/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/instagram.png"
                                    alt="instagram.com/gani.raa/"
                                    width="30"
                                    height="30"
                                />
                            </a>
                        </div>
                        <div>
                            <a href="//linkedin.com/in/ganira/" target="_blank" rel="noopener noreferrer">
                                <Image
                                    src="/linkedin.png"
                                    alt="linkedin.com/in/ganira/"
                                    width="30"
                                    height="30"
                                />
                            </a>
                        </div>
                        <div>
                            <a href="mailto:contact@ganira.net" uk-tooltip="contact@ganira.net">
                                <Image
                                    src="/email.png"
                                    alt="contact@ganira.net"
                                    width="30"
                                    height="30"
                                />
                            </a>
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

    const articles = allArticles.filter((article) => article.category.locale === locale)

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


    return {
        props: {articles, categories, localSeo, pages}
    };
}

export default Home