import { defaultSeo } from '.';
import Header from '../components/header'
import Hero from '../components/hero';
import Seo from '../components/seo'
import { getAllArticles } from '../lib/build-lib';

export default function AboutMe({ categories, localSeo }) {
  return (
    <>
      <Seo seo={localSeo} />

      <Header categories={categories} localSeo={localSeo} />

      <Hero title={localSeo.metaTitle} image={"/assets/aboutme-cover.jpg"} />

    </>
  )
}


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

  return {
    props: { categories, localSeo }
  };
}
