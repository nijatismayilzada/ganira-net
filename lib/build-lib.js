import fs from 'fs'
import {join} from 'path'
import matter from 'gray-matter'

const sharp = require('sharp');

function snooze(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const articlesDirectory = join(process.cwd(), '_articles')

export function getArticleSlugs() {
    return fs.readdirSync(articlesDirectory)
}

export function getArticleBySlug(slug, fields = []) {

    const fullPath = join(articlesDirectory, `${slug}/article.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const {data, content} = matter(fileContents)

    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = slug
        }
        if (field === 'content') {
            items[field] = content.replaceAll('](uploads/', '](/uploads/')
        }

        if (typeof data[field] !== 'undefined') {

            if (field === 'image') {
                items[field] = data[field].replaceAll('uploads/', '/uploads/')
            } else {
                items[field] = data[field]
            }

        }
    })

    return items
}

export function getAllArticles(fields = []) {
    const articles = getArticleSlugs()
        .map((slug) => getArticleBySlug(slug, fields))
        // sort articles by date in descending order
        .sort((article1, article2) => (article1.date > article2.date ? -1 : 1))
    return articles
}


export async function compressImage(src, slug) {
    console.log(`Checking image ${src}`);
    return new Promise(function (resolve, reject) {
        if (fs.existsSync(`${process.cwd()}/public${src}`)) {
            resolve()
        } else {
            sharp(`${process.cwd()}/_articles/${slug}${src}`)
                .rotate()
                .resize(1920, 1920, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true
                })
                .jpeg()
                .toFile(`${process.cwd()}/public${src}`)
                .then(() => {
                    console.log(`Compressed ${process.cwd()}/public${src}`)
                    resolve()
                })
                .catch(function (err) {
                    if (fs.existsSync(`${process.cwd()}/_articles/${slug}${src}`)) {
                        fs.renameSync(`${process.cwd()}/_articles/${slug}${src}`, `${process.cwd()}/public${src}`)
                        console.log(`Moved original file ${process.cwd()}/_articles/${slug}${src}`)
                    }
                    console.log(`Failed to compress ${process.cwd()}/public${src}`)
                    console.log(`${err}`)
                    resolve()
                })
        }
    });
}


function generateRssItem(article, localSeo) {
    return `
<item>
  <guid>https://ganira.net/${localSeo.locale}/articles/${article.slug}</guid>
  <title>${article.title}</title>
  <link>https://ganira.net/${localSeo.locale}/articles/${article.slug}</link>
  <description>${article.description}</description>
  <pubDate>${new Date(article.date).toUTCString()}</pubDate>
</item>
`;
}


export async function generateRss(articles, localSeo) {
    const rss = `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${localSeo.metaTitle}</title>
  <link>https://ganira.net</link>
  <description>${localSeo.metaDescription}</description>
  <language>${localSeo.locale}</language>
  <lastBuildDate>${new Date(articles[0].date).toUTCString()}</lastBuildDate>
  <atom:link href="https://ganira.net/feed/rss-${localSeo.locale}.xml" rel="self" type="application/rss+xml"/>
  ${articles.map(article => generateRssItem(article, localSeo)).join('')}
</channel>
</rss>
`;
    fs.writeFileSync(`${process.cwd()}/public/feed/rss-${localSeo.locale}.xml`, rss);
    console.log(`Generated RSS ${process.cwd()}/public/feed/rss-${localSeo.locale}.xml`);
}