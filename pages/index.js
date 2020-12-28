import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {fetchAPI} from "../lib/api";

const Home = ({articles, categories, global}) => {
    return (
        <Layout categories={categories}>
            <Seo seo={global.defaultSeo[0]}/>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{global.hero.title}</h1>
                    <Articles articles={articles}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps({locale, locales}) {
    // Run API calls in parallel
    const [allArticles, global] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI("/global"),
    ]);

    const articles = allArticles.filter((article) => {
        return article.category.locale === locale;
    })

    const categories = [...new Map(articles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    return {
        props: {articles, categories, global},
        revalidate: 1,
    };
}

export default Home