import ReactMarkdown from "react-markdown";
import {fetchAPI} from "../../lib/runtimeLib";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import {useRouter} from "next/router";
import React from "react";

const Page = ({page, pages, categories}) => {

    const router = useRouter();

    if (router.isFallback) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const seo = {
        metaTitle: page.name,
        metaDescription: page.description,
        shareImage: page.image
    };

    return (
        <Layout categories={categories} pages={pages}>
            <Seo seo={seo}/>
            <div
                id="banner"
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-background-fixed"
                data-src={page.image.url}
                data-srcset={page.image.url}
                data-uk-img
            >
                <h1 className="uk-heading-xlarge">{page.name}</h1>
            </div>
            <div className="uk-section">
                <div className="uk-container uk-container-small">
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
        fallback: true,
    };
}

export async function getStaticProps({params, locale}) {
    const [articles, pages] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI(`/pages?locale=${locale}`),
    ]);

    const categories = [...new Map(articles
        .filter((article) => article.category.locale === locale)
        .flatMap((article) => article.category)
        .map(item => [item['id'], item])).values()]

    const page = pages
        .find((page) => {
            if (page.slug === params.slug) return page
        })

    return {
        props: {page, pages, categories},
        revalidate: 10,
    };
}

export default Page