import React from "react";
import Link from "next/link";

const Nav = ({categories, pages}) => {
    return (
        <div>
            <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-center">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link href="/">
                                <a>GANIRA.NET</a>
                            </Link>
                        </li>
                        {pages.map((page) => {
                            return (
                                <li key={page.id}>
                                    <Link as={`/page/${page.slug}`} href="/page/[id]">
                                        <a className="uk-link-reset">{page.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                        {categories.map((category) => {
                            return (
                                <li key={category.id}>
                                    <Link as={`/category/${category.slug}`} href="/category/[id]">
                                        <a className="uk-link-reset">{category.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="uk-navbar-right uk-visible@s">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link href="/" locale="en">
                                <a>
                                    <img
                                        className="flag"
                                        src="/gb.png"
                                        alt="uk flag"
                                    />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" locale="az">
                                <a>
                                    <img
                                        className="flag"
                                        src="/az.png"
                                        alt="azerbaijani flag"
                                    />
                                </a>
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Nav