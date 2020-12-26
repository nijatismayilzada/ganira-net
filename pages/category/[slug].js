import Articles from "../../components/articles";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import {fetchAPI} from "../../lib/api";
import React from "react";

const Category = ({category, categories, articles}) => {
    const seo = {
        metaTitle: category.name,
        metaDescription: `All ${category.name} articles`,
    };

    return (
        <Layout categories={categories}>
            <Seo seo={seo}/>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{category.name}</h1>
                    <Articles articles={articles}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths({locales}) {
    const articles = await fetchAPI("/articles");
    const categories = [...new Map(articles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    const paths = []
    categories.forEach((category) => {
        locales.forEach((locale) => {
                paths.push({params: {slug: category.slug}, locale})
            }
        )
    });

    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const allArticles = await fetchAPI("/articles");

    const articles = allArticles.filter((article) => {
        return article.category.slug === params.slug;
    })

    const category = articles[0].category;

    const localisedArticles = allArticles.filter((article) => {
        return article.category.locale === category.locale;
    })

    const categories = [...new Map(localisedArticles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    return {
        props: {category, categories, articles},
        revalidate: 1,
    };
}

export default Category