import Articles from "../../components/articles";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import {fetchAPI} from "../../lib/runtimeLib";
import React from "react";

const Category = ({category, categories, articles, pages}) => {
    const seo = {
        metaTitle: category.name,
        metaDescription: `All ${category.name} articles`,
    };

    return (
        <Layout categories={categories} pages={pages}>
            <Seo seo={seo}/>
            <div className="uk-section">
                <div className="uk-container uk-container-medium">
                    <h1 className="living uk-heading-xlarge uk-position-relative uk-position-center">{category.name}</h1>
                    <Articles articles={articles}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const articles = await fetchAPI("/articles");
    const categories = [...new Map(articles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    const paths = []
    categories.forEach((category) => {
        paths.push({params: {slug: category.slug}, locale: category.locale})

    });

    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps({params, locale}) {
    const [allArticles, pages] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI(`/pages?locale=${locale}`),
    ]);

    const sortedArticles = allArticles.sort((a, b) => (a.published_at < b.published_at) ? 1 : -1);

    const articles = sortedArticles.filter((article) => {
        return article.category.slug === params.slug;
    });

    const category = articles[0].category;

    const categories = [...new Map(sortedArticles
        .filter((article) => article.category.locale === locale)
        .flatMap((article) => article.category)
        .map(item => [item['id'], item])).values()]

    return {
        props: {category, categories, articles, pages}
    };
}

export default Category