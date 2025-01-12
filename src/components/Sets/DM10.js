import React from 'react';
import { BsCurrencyDollar } from "react-icons/bs";
import { cardDM10 } from '../../data/cardDM10';
import { Link } from 'react-router-dom';
import DM10Logo from '../../images/logos/DM10Logo20x20.webp';

const DM10 = () => {
  return (
    <main className='Main__container'>
      <div className='DM__title_container'>
        <p className='DM__title'>DM-10</p>
        <img 
          src={DM10Logo} 
          alt="DM10 Logo" 
          width='20' 
          height='20' 
          className='DM__set_img' 
        />
      </div>
      <div className='DM__outer_container'>
        <div className='DM__row_container'>
          {cardDM10.map(card => (
            <Link to={`/card/dm10/${card.id}`} className='Link__settings' key={card.id}>
              <div className='DM__img_container'>
                <img 
                  src={card.image} 
                  alt="DM10 card" 
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

export default DM10;
