// Este componente reúne header e barra lateral para facilitar a renderização de uma página

import React from "react";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
