import ReactMarkdown from "react-markdown";
import {fetchAPI, getStrapiMedia} from "../../lib/api";
import Layout from "../../components/layout";
import Seo from "../../components/seo";

const Page = ({page, pages, categories}) => {
    const imageUrl = getStrapiMedia(page.image);

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
                className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
                data-src={imageUrl}
                data-srcset={imageUrl}
                data-uk-img
            >
                <h1>{page.name}</h1>
            </div>
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <ReactMarkdown source={page.content} escapeHtml={false}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths({locales}) {
    const pages = await fetchAPI("/pages");

    const paths = []
    pages.forEach((page) => {
        locales.forEach((locale) => {
                paths.push({params: {slug: page.slug}, locale})
            }
        )
    });

    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps({params, locale}) {
    const [articles, rawPages] = await Promise.all([
        fetchAPI("/articles"),
        fetchAPI(`/pages?locale=${locale}`),
    ]);

    const pages = JSON.parse(JSON.stringify(rawPages));

    const categories = JSON.parse(JSON.stringify([...new Map(articles
        .filter((article) => article.category.locale === locale)
        .flatMap((article) => article.category)
        .map(item => [item['id'], item])).values()]));

    const page = JSON.parse(JSON.stringify(pages
            .find((page) => {
                if (page.slug === params.slug) return page
            })));

    return {
        props: {page, pages, categories},
        revalidate: 1,
    };
}

export default Page