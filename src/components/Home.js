import React from "react";
import { Link } from "react-router-dom";

import Bolmeteus from "../images/cards/Bolmeteus403x560.jpg";
import Bombazar from "../images/cards/Bombazar403x560.jpg";
import Gigazald from "../images/cards/Gigazald403x560.jpg";
import Alquedias from "../images/cards/Alqedias403x560.jpg";
import Naga from "../images/cards/Naga403x560.jpg";
import Paladin from "../images/cards/Paladin403x560.jpg";

import FireStarter from "../images/starter/Fire893x683.png";
import NatureStarter from "../images/starter/Nature1103x888.png";
import DarkStarter from "../images/starter/Dark1190x760.png";
import WaterStarter from "../images/starter/Water1063x936.png";

import ArticlesLogo from "../images/logos/Article1216x832.jpg";

import useWindowSize from "../hooks/useWindowSize";

const Home = () => {
  const { width, height } = useWindowSize();

  const showHotTablet = width >= 768;
  const showHotDesktop = width >= 1024;
  const isLandscape = width > height;
  const showHotLandscape = width <= 1024 && isLandscape;

  return (
    <main className="Main__container">
      <p className="Home__titles">Trending Cards</p>
      <div className="Home__hot_container">
        <Link to="/card/dm06/Bolmeteus" className="Link__settings">
          <div className="Home__hot_card_container">
            <img
              src={Bolmeteus}
              alt="Bolmeteus card"
              width="406"
              height="560"
              className="Home__hot_image"
            />
          </div>
        </Link>
        <Link to="/card/dm10/Bombazar" className="Link__settings">
          <div className="Home__hot_card_container">
            <img
              src={Bombazar}
              alt="Bombazar card"
              width="406"
              height="560"
              className="Home__hot_image"
            />
          </div>
        </Link>
        {showHotTablet && !showHotLandscape && (
          <Link to="/card/dm06/Phantasmal" className="Link__settings">
            <div className="Home__hot_card_container">
              <img
                src={Gigazald}
                alt="Gigazald card"
                width="406"
                height="560"
                className="Home__hot_image"
              />
            </div>
          </Link>
        )}
        {showHotDesktop && !showHotLandscape && (
          <>
            <Link to="/card/dm04/Alqedias" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Alquedias}
                  alt="Alquedias card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
            <Link to="/card/dm12/Naga" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Naga}
                  alt="Naga card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
            <Link to="/card/dm02/Paladin" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Paladin}
                  alt="Paladin card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
          </>
        )}
        {showHotLandscape && (
          <>
            <Link to="/card/dm06/Phantasmal" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Gigazald}
                  alt="Gigazald card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
            <Link to="/card/dm04/Alqedias" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Alquedias}
                  alt="Alquedias card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
            <Link to="/card/dm12/Naga" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Naga}
                  alt="Naga card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
            <Link to="/card/dm02/Paladin" className="Link__settings">
              <div className="Home__hot_card_container">
                <img
                  src={Paladin}
                  alt="Paladin card"
                  width="406"
                  height="560"
                  className="Home__hot_image"
                />
              </div>
            </Link>
          </>
        )}
      </div>

      <p className="Home__titles">Starter Decks</p>
      <div className="Home__starter_container">
        <div className="Home__starter_row_container">
          <Link to="/starter/starterFire" className="Link__settings">
            <div className="Home__starter_deck_container">
              <img
                src={FireStarter}
                alt="Fire Starter"
                height="683"
                width="893"
                className="Home__starter_image"
              />
              <p id="firestarter" className="Home__starter_deck_type">
                Fire
              </p>
            </div>
          </Link>
          <Link to="/starter/starterNature" className="Link__settings">
            <div className="Home__starter_deck_container">
              <img
                src={NatureStarter}
                alt="Nature Starter"
                height="888"
                width="1103"
                className="Home__starter_image"
              />
              <p id="naturestarter" className="Home__starter_deck_type">
                Nature
              </p>
            </div>
          </Link>
        </div>

        <div className="Home__starter_row_container">
          <Link to="/starter/starterWater" className="Link__settings">
            <div className="Home__starter_deck_container">
              <img
                src={WaterStarter}
                alt="Water Starter"
                height="936"
                width="1063"
                className="Home__starter_image"
              />
              <p id="waterstarter" className="Home__starter_deck_type">
                Water
              </p>
            </div>
          </Link>
          <Link to="/starter/starterDark" className="Link__settings">
            <div className="Home__starter_deck_container">
              <img
                src={DarkStarter}
                alt="Dark Starter"
                height="760"
                width="1190"
                className="Home__starter_image"
              />
              <p id="darkstarter" className="Home__starter_deck_type">
                Dark
              </p>
            </div>
          </Link>
        </div>
      </div>

      <p className="Home__titles">Articles</p>
      <Link to="/articles" className="Link__settings">
        <div className="Home__articles_container">
          <img
            src={ArticlesLogo}
            alt="Articles Logo"
            width="832"
            height="1216"
            className="Home__articles_image"
          />
          <p className="Home__articles_title">Articles</p>
        </div>
      </Link>
    </main>
  );
};

export default Home;
