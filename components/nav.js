import React from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = ({categories, pages}) => {
    return (
        <div>
            <nav className="uk-navbar-container" uk-navbar="true">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link href="/">
                                <a className="ganira-net">GANIRA.NET</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-center">
                    <ul className="uk-navbar-nav uk-visible@m">
                        <li key="instagram">
                            <a className="insta" href="//instagram.com/gani.raa/">INSTAGRAM</a>
                        </li>
                        {pages.map((page) => {
                            return (
                                <li key={page.name}>
                                    <Link href={`/page/${page.slug}`}>
                                        <a>{page.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                        {categories.map((category) => {
                            return (
                                <li key={category.name}>
                                    <Link href={`/category/${category.slug}`}>
                                        <a>{category.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav uk-visible@m">
                        <li key="ukflag">
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
                        <li key="azflag">
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
                    <a className="uk-hidden@m" uk-toggle="target: #sidenav">
                        <Image
                            src="/menu_black_48dp.png"
                            alt="uk flag"
                            width="40"
                            height="40"
                        />
                    </a>

                </div>
            </nav>


            <div id="sidenav" uk-offcanvas="mode: push; flip: true; overlay: true">
                <div className="uk-offcanvas-bar">
                    <div className="uk-position-relative uk-position-medium uk-position-top-center">
                        <Link href="/" locale="en">
                            <a className="uk-padding-small">
                                <Image
                                    src="/gb.png"
                                    alt="uk flag"
                                    width="40"
                                    height="20"
                                />
                            </a>
                        </Link>
                        <Link href="/" locale="az">
                            <a className="uk-padding-small">
                                <Image
                                    src="/az.png"
                                    alt="azerbaijani flag"
                                    width="40"
                                    height="20"
                                />
                            </a>
                        </Link>
                    </div>
                    <ul className="uk-nav uk-nav-default">
                        <li key="instagram">
                            <a className="insta" href="https://www.instagram.com/gani.raa/">INSTAGRAM</a>
                        </li>
                        {pages.map((page) => {
                            return (
                                <li key={page.name}>
                                    <Link href={`/page/${page.slug}`}>
                                        <a className="uk-text-uppercase">{page.name}</a>
                                    </Link>
                                </li>
                            );
                        })}
                        {categories.map((category) => {
                            return (
                                <li key={category.name}>
                                    <Link href={`/category/${category.slug}`}>
                                        <a className="uk-text-uppercase">{category.name}</a>
                                    </Link>
                                </li>
                            );
                        })}

                    </ul>
                </div>
            </div>

        </div>
    );
};

export default Nav