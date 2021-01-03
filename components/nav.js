import React from "react";
import Link from "next/link";
import Image from "next/image";

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
                                    <Image
                                        src="/gb.png"
                                        alt="uk flag"
                                        width="40"
                                        height="20"
                                    />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/" locale="az">
                                <a>
                                    <Image
                                        src="/az.png"
                                        alt="azerbaijani flag"
                                        width="40"
                                        height="20"
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