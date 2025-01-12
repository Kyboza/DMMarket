import React from 'react';
import Swal from 'sweetalert2';
import useWindowSize from '../../hooks/useWindowSize';
import { FaShoppingCart } from 'react-icons/fa';
import { cardList } from '../../data/cardList';
import { cardDM02 } from '../../data/cardDM02';
import { cardDM03 } from '../../data/cardDM03';
import { cardDM04 } from '../../data/cardDM04';
import { cardDM05 } from '../../data/cardDM05';
import { cardDM06 } from '../../data/cardDM06';
import { cardDM07 } from '../../data/cardDM07';
import { cardDM08 } from '../../data/cardDM08';
import { cardDM09 } from '../../data/cardDM09';
import { cardDM10 } from '../../data/cardDM10';
import { cardDM11 } from '../../data/cardDM11';
import { cardDM12 } from '../../data/cardDM12';
import { useParams } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Card = () => {
    const { width } = useWindowSize();
    const smallLayout = width < 1024;
    const largeLayout = width >= 1024;

    const { setId, cardId } = useParams();
    const cardListToUse = setId === 'dm12' ? cardDM12
        : setId === 'dm11' ? cardDM11
        : setId === 'dm10' ? cardDM10
        : setId === 'dm09' ? cardDM09
        : setId === 'dm08' ? cardDM08
        : setId === 'dm07' ? cardDM07
        : setId === 'dm06' ? cardDM06
        : setId === 'dm05' ? cardDM05
        : setId === 'dm04' ? cardDM04
        : setId === 'dm03' ? cardDM03
        : setId === 'dm02' ? cardDM02
        : cardList;

    const card = cardListToUse.find((c) => c.id === cardId);

    const cartItems = useStoreState((state) => state.cart.items);
    const addToCart = useStoreActions((actions) => actions.cart.addToCart);
    const totalCartAmount = cartItems.reduce((total, card) => total + card.amount, 0);

    const buyNow = (e) => {
        if (totalCartAmount < 8) {
            addToCart({
                id: card.id,
                name: card.name,
                price: card.price,
                rarity: card.rarity,
                image: card.image,
                amount: card.amount
            });
            Swal.fire({
                title: 'Added To Cart',
                text: 'Successfully added to cart',
                timer: 1000,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#14BFEEBF'
            });
        } else {
            e.preventDefault();
            Swal.fire({
                title: 'Cart Is Full',
                text: 'You can have a maximum of 8 items in your cart',
                icon: 'error',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#14BFEEBF'
            });
        }
    }

    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <>
            {smallLayout && (
                <main className='Main__container'>
                    <div className='Card__inner_container'>
                        <p className='Card__title'>Duel Masters - {card.name}</p>
                        <div className='Card__img_container'>
                            <img className='Card__img' src={card.image} alt={card.name} width='403' height='560' />
                        </div>
                        <ul className='Card__desc_ul_container'>
                            <li className='Card__desc_li'>Name: {card.name}</li>
                            <li className='Card__desc_li'>Rarity: {card.rarity}</li>
                            <li className='Card__desc_li'>Type: {card.type}</li>
                            <li className='Card__desc_li'>Price: {card.price} $</li>
                        </ul>
                        <button className='Card__buy_container' onClick={buyNow}>
                            <p className='Card__buy_title'>Add To Cart</p>
                            <FaShoppingCart className='Card__buy_icon' />
                        </button>
                    </div>
                </main>
            )}

            {largeLayout && (
                <main className='Main__container'>
                    <p className='Card__title'>Duel Masters - {card.name}</p>
                    <div className='Card__inner_large_container'>
                        <div className='Card__img_large_container'>
                            <img className='Card__img' src={card.image} alt={card.name} width='403' height='560' />
                        </div>
                        <ul className='Card__desc_ul_large_container'>
                            <li className='Card__desc_large_li'>Name: {card.name}</li>
                            <li className='Card__desc_large_li'>Rarity: {card.rarity}</li>
                            <li className='Card__desc_large_li'>Type: {card.type}</li>
                            <li className='Card__desc_large_li'>Price: {card.price} $</li>
                        </ul>
                    </div>
                    <button className='Card__buy_large_container' onClick={buyNow}>
                        <p className='Card__buy_title'>Add To Cart</p>
                        <FaShoppingCart className='Card__buy_icon' />
                    </button>
                </main>
            )}
        </>
    );
};

export default Card;
