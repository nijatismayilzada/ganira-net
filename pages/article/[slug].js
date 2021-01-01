import ReactMarkdown from "react-markdown";
import {fetchAPI} from "../../lib/runtimeLib";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import Date from "../../components/date";
import React from "react";

const Article = ({article, pages, categories}) => {

    const seo = {
        metaTitle: article.title,
        metaDescription: article.description,
        shareImage: article.image,
        article: true,
    };

    return (
        <Layout categories={categories} pages={pages}>
            <Seo seo={seo}/>
            <div
                id="banner"
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                data-src={article.image.url}
                data-srcset={article.image.url}
                data-uk-img
            >
                <h1>{article.title}</h1>
            </div>
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <ReactMarkdown source={article.content} escapeHtml={false}/>
                    <hr className="uk-divider-small"/>
                    <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
                        <div>
                            {article.writer.picture && (
                                <img
                                    src={article.writer.picture.url}
                                    alt={article.writer.picture.alternativeText || article.writer.picture.name}
                                    style={{
                                        position: "static",
                                        borderRadius: "50%",
                                        height: 30,
                                    }}
                                />
                            )}
                        </div>
                        <div className="uk-width-expand">
                            <p className="uk-margin-remove-bottom">
                                By {article.writer.name}
                            </p>
                            <p className="uk-text-meta uk-margin-remove-top">
                                <Date dateString={article.published_at}/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths({locales}) {
    const articles = await fetchAPI("/articles");

    const paths = []
    articles.forEach((article) => {
        locales.forEach((locale) => {
                paths.push({params: {slug: article.slug}, locale})
            }
        )
    });

    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps({params, locale}) {
    const [articles, pages] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI(`/pages?locale=${locale}`),
    ]);

    const article = articles
        .find((article) => {
            if (article.slug === params.slug) return article
        })

    const categories = [...new Map(articles
        .filter((article) => article.category.locale === locale)
        .flatMap((article) => article.category)
        .map(item => [item['id'], item])).values()];

    return {
        props: {article, pages, categories},
        revalidate: 1,
    };
}

export default Article