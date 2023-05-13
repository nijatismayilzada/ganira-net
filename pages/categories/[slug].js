import Container from '../../components/container'
import Header from '../../components/header'
import Seo from '../../components/seo'
import ArticlePreview from '../../components/article-preview'
import { getAllArticles } from '../../lib/build-lib'
import { defaultSeo } from '..'
import Hero from '../../components/hero'

export default function Category({ articles, categories, localSeo, currentCategory }) {
    return (
        <>
            <Seo seo={localSeo} />

            <Header categories={categories} localSeo={localSeo} />

            <Hero title={currentCategory} image={"/assets/background.jpeg"} />

            <Container>
                <div className="columns is-multiline">
                    {articles.map((article) => (
                        <ArticlePreview
                            key={article.slug}
                            title={article.title}
                            date={article.date}
                            slug={article.slug}
                            description={article.description}
                            image={article.image}
                        />
                    ))}
                </div>
            </Container>
        </>
    )
}


export async function getStaticProps({ params, locale }) {

    const articles = getAllArticles([
        'title',
        'description',
        'category',
        'locale',
        'image',
        'date',
        'slug',
        'content'
    ]).filter((article) => article.locale === locale)
        .sort((a, b) => (a.date < b.date) ? 1 : -1);

    const articlesOfCategory = articles.filter((article) => article.category === params.slug)

    const currentCategory = params.slug

    const categories = articles.flatMap((article) => article.category).filter((v, i, a) => a.indexOf(v) === i)

    const localSeo = defaultSeo.filter((seo) => seo.locale === locale)[0];

    return {
        props: { articles: articlesOfCategory, categories, localSeo, currentCategory }
    };
}

export async function getStaticPaths() {
    const articles = getAllArticles(['category', 'locale'])

    return {
        paths: articles.map((article) => {
            return {
                params: {
                    slug: article.category,
                },
                locale: article.locale,
            }
        }),
        fallback: false,
    }
}
