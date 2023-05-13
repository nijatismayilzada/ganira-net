import DateFormatter from './date-formatter'
import Link from 'next/link'

export default function ArticlePreview({ title, date, description, slug, image }) {
  return (
    <div className="column is-one-third-desktop is-half-tablet">

      <div className="card">
        <div className="card-image">
          <figure className="image ">
            <img src={image} alt="Placeholder image" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <Link as={`/articles/${slug}`} href="/articles/[slug]">
                <p className="is-size-5 has-text-weight-semibold">{title}</p>
              </Link>
            </div>
          </div>

          <div className="content">
            <p className="is-size-6">{description}</p>
            <small>
              <DateFormatter dateString={date} />
            </small>
          </div>
        </div>
      </div>

    </div>
  )
}
