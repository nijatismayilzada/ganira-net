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
                        reject(error);
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
                    reject(err);
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
