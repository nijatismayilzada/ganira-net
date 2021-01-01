import fetch from "isomorphic-unfetch";
import fs from "fs";
import {getStrapiURL} from "./runtimeLib";

export async function fetchImage(src) {

    const resp = await fetch(getStrapiURL(src));

    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(`./public${src}`);
        if (!resp || !resp.body) {
            reject("no body on fetch response");
        } else {
            resp.body.pipe(fileStream);
            fileStream.on("finish", () => {
                resolve();
            });
            fileStream.on("error", err => {
                reject(err);
            });
        }
    });
}