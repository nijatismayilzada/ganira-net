import fetch from "isomorphic-unfetch";
import fs from "fs";
import {getStrapiURL} from "./runtimeLib";

const sharp = require('sharp');
const snooze = ms => new Promise(resolve => setTimeout(resolve, ms));

async function saveTemporaryImage(src, resp) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(`${process.cwd()}/tmp${src}`);
        if (!resp || !resp.body) {
            reject("no body on fetch response");
        } else {
            resp.body.pipe(fileStream);
            fileStream.on("finish", () => {
                console.log(`Downloaded to ${process.cwd()}/tmp${src}`);
                resolve();
            });
            fileStream.on("error", err => {
                console.log(`Failed to download ${process.cwd()}/tmp${src}`);
                console.log(`${err}`);
                reject(err);
            });
        }
    });
}

async function compressImage(src) {
    await snooze(1000);
    return new Promise((resolve, reject) => {
        sharp(`./tmp${src}`)
            .resize(1920, 1920, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .jpeg()
            .toFile(`${process.cwd()}/public${src}`)
            .then(() => {
                if (fs.existsSync(`${process.cwd()}/tmp${src}`)) {
                    fs.unlinkSync(`${process.cwd()}/tmp${src}`);
                    console.log(`Deleted temp file ${process.cwd()}/tmp${src}`);
                }
                console.log(`Compressed ${process.cwd()}/public${src}`);
                resolve();
            })
            .catch(err => {
                if (fs.existsSync(`${process.cwd()}/tmp${src}`)) {
                    fs.renameSync(`${process.cwd()}/tmp${src}`, `${process.cwd()}/public${src}`)
                    console.log(`Moved original file ${process.cwd()}/tmp${src}`);
                }
                console.log(`Failed to compress ${process.cwd()}/public${src}`);
                console.log(`${err}`);
                resolve();
            });
    });
}


export async function fetchImage(src) {
    const resp = await fetch(getStrapiURL(src));

    await saveTemporaryImage(src, resp);
    await compressImage(src);
}


function generateRssItem(article, locale) {
    return `
  <item>
    <guid>https://ganira.net/${locale}/${article.slug}</guid>
    <title>${article.title}</title>
    <link>https://ganira.net/${locale}/${article.slug}</link>
    <description>${article.description}</description>
    <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
  </item>
`;
}

export async function generateRss(articles, localSeo, locale) {
    const rss = `
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${localSeo.metaTitle}</title>
    <link>https://ganira.net</link>
    <description>${localSeo.metaDescription}</description>
    <language>${locale}</language>
    <lastBuildDate>${new Date(articles[0].published_at).toUTCString()}</lastBuildDate>
    <atom:link href="https://ganira.net/feed/rss-${locale}.xml" rel="self" type="application/rss+xml"/>
    ${articles.map(article => generateRssItem(article, locale)).join('')}
  </channel>
</rss>
`;
    fs.writeFileSync(`${process.cwd()}/public/feed/rss-${locale}.xml`, rss);
    console.log(`Generated RSS ${process.cwd()}/public/feed/rss-${locale}.xml`);
}
