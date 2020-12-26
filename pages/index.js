import React from "react";
import Articles from "../components/articles";
import Layout from "../components/layout";
import Seo from "../components/seo";
import {fetchAPI} from "../lib/api";

const Home = ({articles, categories, homepage}) => {
    return (
        <Layout categories={categories}>
            <Seo seo={homepage.seo}/>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{homepage.hero.title}</h1>
                    <Articles articles={articles}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps({locale, locales}) {
    // Run API calls in parallel
    const [allArticles, homepage] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI("/homepage"),
    ]);

    const articles = allArticles.filter((article) => {
        return article.category.locale === locale;
    })

    const categories = [...new Map(articles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    return {
        props: {articles, categories, homepage},
        revalidate: 1,
    };
}

export default Home