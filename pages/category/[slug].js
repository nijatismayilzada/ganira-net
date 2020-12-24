import Articles from "../../components/articles";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import {fetchAPI} from "../../lib/api";

const Category = ({category, categories, articles}) => {
    const seo = {
        metaTitle: category.name,
        metaDescription: `All ${category.name} articles`,
    };

    return (
        <Layout categories={categories}>
            <Seo seo={seo}/>
            <div className="uk-section">
                <div className="uk-container uk-container-large">
                    <h1>{category.name}</h1>
                    <Articles articles={articles}/>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticPaths() {
    const articles = await fetchAPI("/articles");
    const categories = [...new Map(articles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    return {
        paths: categories.map((category) => ({params: {slug: category.slug}})),
        fallback: false,
    };
}

export async function getStaticProps({params}) {
    const allArticles = await fetchAPI("/articles");
    const categories = [...new Map(allArticles.flatMap((article) => article.category).map(item => [item['id'], item])).values()]

    const articles = allArticles.filter((article) => {
        return article.category.slug === params.slug;
    })

    const category = articles[0].category;

    return {
        props: {category, categories, articles},
        revalidate: 1,
    };
}

export default Category;