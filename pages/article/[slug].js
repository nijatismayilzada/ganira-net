import ReactMarkdown from "react-markdown";
import {fetchAPI, getStrapiMedia} from "../../lib/api";
import Layout from "../../components/layout";
import Image from "../../components/image";
import Seo from "../../components/seo";
import Date from "../../components/date";

const Article = ({article, categories}) => {
    const imageUrl = getStrapiMedia(article.image);

    const seo = {
        metaTitle: article.title,
        metaDescription: article.description,
        shareImage: article.image,
        article: true,
    };

    return (
        <Layout categories={categories}>
            <Seo seo={seo}/>
            <div
                id="banner"
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                data-src={imageUrl}
                data-srcset={imageUrl}
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
                                <Image
                                    image={article.writer.picture}
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

export async function getStaticProps({params}) {
    const articles = await fetchAPI("/articles");

    const article = articles
        .find((article) => {
            if (article.slug === params.slug) return article
        })

    const localisedArticles = articles.filter((art) => {
        return art.locale === article.locale;
    })

    const categories = [...new Map(localisedArticles.flatMap((article) => article.category).map(item => [item['id'], item])).values()];

    return {
        props: {article, categories},
        revalidate: 1,
    };
}

export default Article