import React from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = ({categories, pages}) => {
    return (
        <div>
            <nav className="uk-container uk-navbar">
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li className="uk-active">
                            <Link href="/">
                                <a>GANIRA.NET</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-center">
                    <ul className="uk-navbar-nav uk-visible@s">
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
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav uk-visible@s">
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
                    <a className="uk-hidden@s" uk-toggle="target: #sidenav">
                        <Image
                            src="/menu_black_48dp.png"
                            alt="uk flag"
                            width="40"
                            height="40"
                        />
                    </a>

                </div>
            </nav>


            <div id="sidenav" uk-offcanvas="flip: true" className="uk-offcanvas">
                <div className="uk-offcanvas-bar">
                    <ul className="uk-nav">
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
            </div>

        </div>
    );
};

export default Nav