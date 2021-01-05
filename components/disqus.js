import {DiscussionEmbed} from "disqus-react"

const DisqusComments = ({article}) => {
    const disqusShortname = "ganira-net"
    const disqusConfig = {
        url: `https://ganira.net/${article.category.locale}/article/${article.slug}`,
        identifier: `${article.id}`, // Single post id
        title: article.title // Single post title
    }
    return (
        <div>
            <DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            />
        </div>
    )
}
export default DisqusComments;