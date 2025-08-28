import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const NotFound = () => {
  return (
    <Layout >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <h2>Página não encontrada</h2>
        </div>
      <Link to="/">Tente Novamente</Link>
    </Layout>
  );
};

export default NotFound;
