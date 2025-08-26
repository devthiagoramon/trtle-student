// Este componente reúne header e barra lateral para facilitar a renderização de uma página

import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
