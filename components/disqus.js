import { DiscussionEmbed } from "disqus-react"

const DisqusComments = ({ article }) => {
    const disqusShortname = "ganira-net"
    const disqusConfig = {
        url: `https://ganira.net/${article.locale}/articles/${article.slug}`,
        identifier: article.slug,
        title: article.title,
        language: article.locale
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