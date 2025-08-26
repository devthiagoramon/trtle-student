import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div>Página não encontrada</div>
      <Link to="/">Tente Novamente</Link>
    </>
  );
};

export default NotFound;
