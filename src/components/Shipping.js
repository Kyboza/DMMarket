import React from "react";
import DMLogo from "../images/logos/Dmmarketlogo1024x1024.webp";
import { FaFlagUsa } from "react-icons/fa";
import { CgSweden } from "react-icons/cg";

const Shipping = () => {
  return (
    <main className="Main__container">
      <p className="About__title">Shipping</p>
      <div className="Shipping__container">
        <p className="About__p">
          Shipping costs vary by country due to differences in distance, local
          shipping regulations, and carrier rates. We strive to offer the most
          affordable options based on your location. We only ship to Sweden and
          America.
        </p>

        <div className="Shipping__container_position">
          <div className="Shipping__container_desc">
            <CgSweden className="Shipping__flag_icon" />
            <p className="Shipping__p">Sweden - $20</p>
          </div>

          <div className="Shipping__container_desc">
            <FaFlagUsa className="Shipping__flag_icon" />
            <p className="Shipping__p">America - $35</p>
          </div>
        </div>

        <div className="Shipping__img_container">
          <img
            className="Shipping__img"
            src={DMLogo}
            alt="DM Logo"
            width="1024"
            height="1024"
          />
        </div>
      </div>
    </main>
  );
};

export default Shipping;
