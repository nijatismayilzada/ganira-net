export default function Hero({ title, image }) {
    return (
        <section className="hero is-large">
            <div className="hero-body box" style={{ backgroundImage: `url(${image})` }}>
                <div className="container has-text-centered">
                    <h1>
                        {title}
                    </h1>
                </div>
            </div>
        </section >
    )
}
