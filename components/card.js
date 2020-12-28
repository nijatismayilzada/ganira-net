import React from "react";
import Image from "./image";
import Link from "next/link";

const Card = ({article}) => {
    return (
        <Link as={`/article/${article.slug}`} href="/article/[id]">
            <a className="uk-link-reset">
                <div className="uk-card uk-card-default uk-card-muted">
                    <div className="uk-card-media-top">
                        <Image image={article.image}/>
                    </div>
                    <div className="uk-card-body">
                        <p id="category" className="uk-text-uppercase">
                            {article.category.name}
                        </p>
                        <p id="title" className="uk-text-large">
                            {article.title}
                        </p>
                        <p id="description" className="uk-text-lighter uk-text-italic">
                            {article.description}
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default Card