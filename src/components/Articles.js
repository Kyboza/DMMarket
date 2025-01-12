import React from "react";
import { Link } from "react-router-dom";

const Articles = () => {
  return (
    <main className="Articles__page_container">
      <p className="About__title">Articles</p>
      <div className="Articles__container">
        <ul className="Articles__ul">
          <Link to="/article/dragonoidarticle" className="Link__settings">
            <li className="Articles__li" id="firstli">
              <p className="Articles__header_title">
                Article - What are Dragonoids?
              </p>
              <p className="Articles__desc">
                This article briefly explains where the type "Dragonoids" origin
                from. It also mentions their strengths and weaknesses.
              </p>
            </li>
          </Link>

          <Link to="/article/beastfolkArticle" className="Link__settings">
            <li className="Articles__li" id="secondli">
              <p className="Articles__header_title">
                Article - Magic of Beastfolks
              </p>
              <p className="Articles__desc">
                This article briefly explains where "Beastfolks" get their
                incredibly strong magic. It also touches on their alternative
                fighting styles.
              </p>
            </li>
          </Link>

          <Link to="/article/merfolkArticle" className="Link__settings">
            <li className="Articles__li" id="thirdli">
              <p className="Articles__header_title">
                Article - Tales of the Merfolk
              </p>
              <p className="Articles__desc">
                Merfolk care deeply about their beauty, that is why they look
                beautiful even in combat. This article covers why they care
                about beauty and how they fight off foes.
              </p>
            </li>
          </Link>
        </ul>
      </div>
    </main>
  );
};

export default Articles;
