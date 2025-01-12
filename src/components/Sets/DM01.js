import React from 'react';
import { Link } from 'react-router-dom';
import { BsCurrencyDollar } from "react-icons/bs";
import DM01Logo from '../../images/logos/DM1Logo20x20.webp';
import { cardList } from '../../data/cardList';

const DM01 = () => {
  return (
    <main className='Main__container'>
      <div className='DM__title_container'>
        <p className='DM__title'>DM-01</p>
        <img src={DM01Logo} alt="DM01 Logo" width='20' height='20' className='DM__set_img' />
      </div>
      <div className='DM__outer_container'>
        <div className='DM__row_container'>
          {cardList.map(card => (
            <Link to={`/card/dm01/${card.id}`} className='Link__settings' key={card.id}>
              <div className='DM__img_container'>
                <img 
                  src={card.image} 
                  alt="DM01 card" 
                  className='DM__img_settings' 
                  tabIndex='1' 
                  width='406' 
                  height='560' 
                />
                <div className='DM__img_price_container'>
                  <p className='DM__img_price_text'>
                    <BsCurrencyDollar className='DM__img_currency_icon' />
                    {card.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DM01;
