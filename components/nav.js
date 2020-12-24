import React from "react";
import PropTypes from 'prop-types'
import Link from "next/link";
import { i18n, withTranslation } from '../i18n'

const Nav = ({categories, t}) => {
    return (
        <div>
            <nav className="uk-navbar-container" data-uk-navbar>
                <div className="uk-navbar-left">
                    <ul className="uk-navbar-nav">
                        <li>
                            <Link href="/">
                                <a>{t('title')}</a>
                            </Link>
                            <button
                                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'az' : 'en')}
                            >
                                Change locale
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="uk-navbar-right">
                    <ul className="uk-navbar-nav">
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
            </nav>
        </div>
    );
};

Nav.getInitialProps = async () => ({
    namespacesRequired: ['common'],
})

Nav.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Nav)