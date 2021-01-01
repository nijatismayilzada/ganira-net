import fetch from "isomorphic-unfetch";
import fs from "fs";
import {getStrapiURL} from "./runtimeLib";

export async function fetchImage(media) {

    const resp = await fetch(getStrapiURL(media.url));

    await new Promise((resolve, reject) => {
        const fileStream = fs.createWriteStream(`./public/content/${media.name}`);
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

    return {
        name: media.name,
    };
}