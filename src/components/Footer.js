import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Footer = () => {
  const today = new Date();
  const yearFormat = format(today, "yyyy");

  return (
    <footer className="Footer__container">
      <div className="Footer__title_container">
        <h3 className="Footer__title">&#169;DMMarket Group {yearFormat}</h3>
      </div>

      <div className="Footer__content_container">
        <Link to="/sets" className="Link__settings">
          <p className="Footer__content">Set</p>
        </Link>
        <Link to="/shipping" className="Link__settings">
          <p className="Footer__content">Shipping</p>
        </Link>
        <Link to="/about" className="Link__settings">
          <p className="Footer__content">About</p>
        </Link>
        <Link to="/contact" className="Link__settings">
          <p className="Footer__content">Contact</p>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
