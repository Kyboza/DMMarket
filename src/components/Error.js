import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="Error__container">
      <p className="Error__title">404 Page Not Found</p>
      <Link to="/DMMarket/" className="Link__settings">
        <button className="Order__button">Home</button>
      </Link>
    </main>
  );
};

export default Error;
