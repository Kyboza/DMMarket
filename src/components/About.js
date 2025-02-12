import React from "react";
import DMLogo from "../images/logos/Dmmarketlogo1024x1024.webp";

const About = () => {
  return (
    <main className="Main__container">
      <p className="About__title">About</p>
      <div className="About__container">
        <p className="About__p">
          Welcome to DMMarket, your go-to destination for rare and vintage Duel
          Masters cards! Founded by Johan, a 24-year-old enthusiast from Sweden,
          DMMarket was born out of a deep passion for the Duel Masters game. We
          take pride in offering a top-tier customer experience, ensuring that
          collectors and players alike can find the cards they love. At
          DMMarket, it's not just about selling cards—it's about sharing the
          excitement and community spirit of Duel Masters with fellow fans.
        </p>
        <div className="About__img_container">
          <img
            className="About__img"
            src={DMLogo}
            alt="dmlogo"
            width="1024"
            height="1024"
          />
        </div>
      </div>
    </main>
  );
};

export default About;
