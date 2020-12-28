import Nav from "./nav";
import React from "react";

const Layout = ({children, categories, pages}) => (
    <>
        <Nav categories={categories} pages={pages}/>
        {children}
    </>
);

export default Layout;