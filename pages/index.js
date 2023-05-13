import Container from '../components/container'
import Header from '../components/header'
import Seo from '../components/seo'
import ArticlePreview from '../components/article-preview'
import { getAllArticles, generateRss, compressImage } from '../lib/build-lib'
import { setLocaleCookie } from '../lib/runtime-lib'
import Hero from '../components/hero'

export default function Index({ articles, categories, localSeo }) {
  setLocaleCookie(localSeo.locale);

  return (
    <>
      <Seo seo={localSeo} />

      <Header categories={categories} localSeo={localSeo} />
      <Hero title={localSeo.metaTitle} image={"/assets/background.jpeg"} />

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

export const defaultSeo = [
  {
    metaTitle: "Living the life of miracles...",
    metaDescription: "ganira.net - a personal lifestyle blog",
    locale: "en",
    shareImage: ""
  },
  {
    metaTitle: "Living the life of miracles...",
    metaDescription: "ganira.net - Şəxsi blog",
    locale: "az",
    shareImage: ""
  }
]


export async function getStaticProps({ locale }) {



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

  for (const article of articles) {
    const images = article.content.match(/]\(\/uploads\/(.*?)\)/g);
    if (images) {
      for (const image of images) {
        await compressImage(image.substr(2).slice(0, -1), article.slug)
      }
    }

    await compressImage(article.image, article.slug);
  }

  await generateRss(articles, localSeo);

  return {
    props: { articles, categories, localSeo }
  };
}
