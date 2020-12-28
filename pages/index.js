import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {fetchAPI, getStrapiMedia} from "../lib/api";

const Home = ({articles, categories, global, pages}) => {
    const imageUrl = getStrapiMedia( global.defaultSeo[0].shareImage);
    return (
        <>

            <Layout categories={categories} pages={pages}>
                <Seo seo={global.defaultSeo[0]}/>
                <div
                    id="main-banner"
                    className="uk-height-large uk-flex uk-flex-center uk-background-cover uk-light uk-padding uk-margin"
                    data-src={imageUrl}
                    data-srcset={imageUrl}
                    data-uk-img
                >
                    <h1>{global.hero.title}</h1>
                </div>
                <div className="uk-section">
                    <div className="uk-container uk-container-large">
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

    return {
        props: {articles, categories, global, pages},
        revalidate: 1,
    };
}

export default Home