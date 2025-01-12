import React from 'react';
import { useParams } from 'react-router-dom';
import { starterFire } from '../../data/starterFire';
import { starterDark } from '../../data/starterDark';
import { starterNature } from '../../data/starterNature';
import { starterWater } from '../../data/starterWater';

const StarterDeck = () => {
    const { starterId } = useParams();

    const starterSelect = starterId === 'starterFire' ? starterFire :
        starterId === 'starterNature' ? starterNature :
        starterId === 'starterDark' ? starterDark :
        starterId === 'starterWater' ? starterWater : [];

    const deckTitle = starterId.replace(/starter/i, '').trim();
    const capitalizedDeckTitle = deckTitle.charAt(0).toUpperCase() + deckTitle.slice(1) + ' Deck Example';

    if (!starterSelect || starterSelect.length === 0) {
        return <p>No cards available for this deck.</p>;
    }

    return (
        <main className='Main__container'>
            <p className='Starter__title'>{capitalizedDeckTitle}</p>

            <div className='Starter__outer_container'>
                <div className='Starter__inner_container'>
                    {starterSelect.map((card, index) => (
                        <div key={index} className='Starter__card'>
                            <img src={card.image} alt={card.id} width='403' height='560' />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default StarterDeck;
