import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({article}) => {
    return (
        <Link as={`/article/${article.slug}`} href="/article/[id]">
            <a className="uk-link-reset">
                <div className="uk-card uk-card-default uk-card-muted">
                    <div className="uk-card-media-top">
                        <Image
                            src={article.image.url}
                            alt={article.image.alternativeText || article.image.name}
                            width={article.image.width}
                            height={article.image.height}
                        />
                    </div>
                    <div className="uk-card-body">
                        <p id="category" className="uk-text-uppercase uk-text-small">
                            {article.category.name}
                        </p>
                        <p id="title" className="uk-text-large">
                            {article.title}
                        </p>
                    </div>
                    <div className="uk-card-footer">
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