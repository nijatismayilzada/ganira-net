import fetch from "isomorphic-unfetch";
import fs from "fs";
import {getStrapiURL} from "./runtimeLib";

const sharp = require('sharp');

function saveTemporaryImage(src, resp) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(`./tmp${src}`);
        if (!resp || !resp.body) {
            reject("no body on fetch response");
        } else {
            resp.body.pipe(fileStream);
            fileStream.on("finish", () => {
                resolve();
            });
            fileStream.on("error", err => {
                console.log(`Failed to download ./tmp${src}`);
                reject(err);
            });
        }
    });
}

function compressImage(src) {
    return new Promise((resolve, reject) => {
        sharp(`./tmp${src}`)
            .resize(1920, 1920, {
                fit: sharp.fit.inside,
                withoutEnlargement: true
            })
            .jpeg()
            .toFile(`${process.cwd()}/public${src}`, (error, info) => {
                    if (error) {
                        console.log(`Failed to compress ${process.cwd()}/public${src}`);
                        //reject(error);
                    } else {
                        resolve(info);
                    }
                }
            );
    });
}

function removeTemporaryImage(src) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`./tmp${src}`)) {
            fs.unlink(`./tmp${src}`, err => {
                if (err) {
                    console.log(`Failed to remove ./tmp${src}`);
                    // reject(err);
                } else {
                    resolve();
                }
            });
        }
    });
}


export async function fetchImage(src) {
    const resp = await fetch(getStrapiURL(src));

    await saveTemporaryImage(src, resp);
    await compressImage(src);
    await removeTemporaryImage(src);
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
    fs.writeFileSync(`./public/feed/rss-${locale}.xml`, rss);
}
