import React from "react";
import Card from "./card";

const Articles = ({articles}) => {
    return (
        <div>
            <div className="uk-child-width-1-3@m uk-child-width-1-2@s" data-uk-grid="true">
                {articles
                    .map((article) => {
                        return (
                            <Card article={article}
                                  key={`article__${article.slug}`}/>
                        );
                    })}
            </div>
        </div>
    );
};

export default Articles;