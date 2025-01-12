import React from 'react';
import { BsCurrencyDollar } from "react-icons/bs";
import { cardDM12 } from '../../data/cardDM12';
import { Link } from 'react-router-dom';
import DM12Logo from '../../images/logos/DM12Logo20x20.webp';

const DM12 = () => {
  return (
    <main className='Main__container'>
      <div className='DM__title_container'>
        <p className='DM__title'>DM-12</p>
        <img 
          src={DM12Logo} 
          alt="DM12 Logo" 
          width='20' 
          height='20' 
          className='DM__set_img' 
        />
      </div>
      <div className='DM__outer_container'>
        <div className='DM__row_container'>
          {cardDM12.map(card => (
            <Link to={`/card/dm12/${card.id}`} className='Link__settings' key={card.id}>
              <div className='DM__img_container'>
                <img 
                  src={card.image} 
                  alt="DM12 card" 
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

export default DM12;
