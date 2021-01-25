import ReactMarkdown from "react-markdown";
import {fetchAPI} from "../../lib/runtimeLib";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import React from "react";

const Page = ({page, pages, categories}) => {
    const seo = {
        metaTitle: page.name,
        metaDescription: page.description,
        shareImage: page.image
    };

    return (
        <Layout categories={categories} pages={pages}>
            <Seo seo={seo}/>
            <div id="banner"
                 className="uk-flex uk-flex-center uk-flex-middle uk-background-cover"
                 data-src={page.image.url} data-srcset={page.image.url} data-uk-img>
                <h1 className="living uk-heading-xlarge">{page.name}</h1>
            </div>
            <div className="uk-section">
                <div className="uk-container uk-container-xsmall uk-padding">
                    <ReactMarkdown source={page.content} escapeHtml={false}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const pages = await fetchAPI("/pages");

    const paths = []
    pages.forEach((page) => {
        paths.push({params: {slug: page.slug}, locale: page.locale});
    });

    return {
        paths: paths,
        fallback: false
    };
}

export async function getStaticProps({params, locale}) {
    const [articles, pages] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI(`/pages?locale=${locale}`),
    ]);

    const categories = [...new Map(articles
        .filter((article) => article.category.locale === locale)
        .sort((a, b) => (a.published_at < b.published_at) ? 1 : -1)
        .flatMap((article) => article.category)
        .map(item => [item['id'], item])).values()]

    const page = pages
        .find((page) => {
            if (page.slug === params.slug) return page
        })

    return {
        props: {page, pages, categories}
    };
}

export default Page