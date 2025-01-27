import Link from 'next/link'

export default function Header({categories, localSeo}) {


    return (
        <section className="section has-background-white pb-5 pt-6">
            <div className="container is-max-desktop ">
                <nav>
                    <div className="columns ">
                        <div className="column is-4 has-text-centered great-vibes">
                            <Link href="/">
                                <div className="is-size-3 has-text-weight-medium">G a n i r a . n e t</div>
                            </Link>
                        </div>

                        <div className="column is-4 ">
                            <div className="columns is-mobile is-gapless has-text-centered">
                                <div className="column">
                                    <Link href="/aboutme">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/aboutme.png" alt="aboutme"/>
                                        </figure>
                                    </Link>
                                </div>
                                <div className="column ">
                                    <a href="https://instagram.com/gani.raa " target="_blank">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/instagram.svg" alt="instagram"/>
                                        </figure>
                                    </a>
                                </div>
                                <div className="column ">
                                    <a href="https://youtube.com/@ganiraahmadova" target="_blank">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/youtube.svg" alt="youtube"/>
                                        </figure>
                                    </a>
                                </div>
                                <div className="column ">
                                    <a href="https://linkedin.com/in/ganira" target="_blank">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/linkedin.svg" alt="linkedin"/>
                                        </figure>
                                    </a>
                                </div>
                                <div className="column">
                                    <a href="mailto:contact@ganira.net" target="_blank">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/email.svg" alt="email"/>
                                        </figure>
                                    </a>
                                </div>
                                <div className="column ">
                                    <Link href={`/feed/rss-${localSeo.locale}.xml`} locale={false} target="_blank">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/rss.svg" alt="rss"/>
                                        </figure>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="column is-4">
                            <div className="columns is-mobile is-gapless">
                                <div className="column has-text-right">
                                    <Link href="/" locale="en">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/gb.svg" alt="en"/>
                                        </figure>
                                    </Link>
                                </div>
                                <div className="column has-text-left">
                                    <Link href="/" locale="az">
                                        <figure className="image is-32x32 is-inline-block">
                                            <img src="/assets/az.svg" alt="az"/>
                                        </figure>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns has-text-centered">
                        {categories.map((category) => {
                            return (
                                <div className="column" key={category}>
                                    <Link as={`/categories/${category}`} href="/categories/[slug]">
                                        <div className="is-size-5 has-text-weight-medium ">{category}</div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </section>
    )
}
