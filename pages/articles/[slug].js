import {useRouter} from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import Seo from '../../components/seo'
import Header from '../../components/header'
import {getAllArticles} from '../../lib/build-lib'
import DateFormatter from '../../components/date-formatter'
import {defaultSeo} from '..'
import Hero from '../../components/hero'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import DisqusComments from '../../components/disqus'
import Markdown from "react-markdown";

export default function Article({article, categories, localSeo}) {
    const seo = {
        metaTitle: article.title,
        metaDescription: article.description,
        locale: localSeo.locale,
        shareImage: article.image
    };
    const router = useRouter()
    if (!router.isFallback && !article?.slug) {
        return <ErrorPage statusCode={404}/>
    }
    return (
        <>
            <Seo seo={seo}/>

            <Header categories={categories} localSeo={localSeo}/>
            <Hero title={article.title} image={article.image}/>

            <Container>
                <div className="box">
                    <article className="media">
                        <div className="content">

                            <h3 className="title is-3">{article.title}</h3>
                            <h5 className="subtitle is-5">{article.category}</h5>

                            <small>
                                <DateFormatter dateString={article.date}/>
                            </small>
                            <br/>
                            <br/>

                            <Markdown children={article.content} remarkPlugins={[remarkGfm]}
                                      rehypePlugins={[rehypeRaw]}/>

                            <br/>
                            <br/>
                            <br/>

                            <DisqusComments article={article}/>
                        </div>
                    </article>
                </div>
            </Container>
        </>
    )
}

export async function getStaticProps({params, locale}) {
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

    const categories = articles.flatMap((article) => article.category).filter((v, i, a) => a.indexOf(v) === i)

    const localSeo = defaultSeo.filter((seo) => seo.locale === locale)[0];

    const article = articles.find((article) => {
        if (article.slug === params.slug) return article;
    })

    return {
        props: {
            article: article,
            categories: categories,
            localSeo: localSeo
        },
    }
}

export async function getStaticPaths() {
    const articles = getAllArticles(['slug', 'locale'])

    return {
        paths: articles.map((article) => {
            return {
                params: {
                    slug: article.slug,
                },
                locale: article.locale,
            }
        }),
        fallback: false,
    }
}
