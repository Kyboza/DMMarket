// store.js
import { createStore, action, computed } from 'easy-peasy';
import { cardList } from './data/cardList';
import { cardDM02 } from './data/cardDM02';
import { cardDM03 } from './data/cardDM03';
import { cardDM04 } from './data/cardDM04';
import { cardDM05 } from './data/cardDM05';
import { cardDM06 } from './data/cardDM06';
import { cardDM07 } from './data/cardDM07';
import { cardDM08 } from './data/cardDM08';
import { cardDM09 } from './data/cardDM09';
import { cardDM10 } from './data/cardDM10';
import { cardDM11 } from './data/cardDM11';
import { cardDM12 } from './data/cardDM12';

const storeModel = {

  searchEngine: {
    allCards: computed(() => {
      return [
        ...cardDM02,
        ...cardDM03,
        ...cardDM04,
        ...cardDM05,
        ...cardDM06,
        ...cardDM07,
        ...cardDM08,
        ...cardDM09,
        ...cardDM10,
        ...cardDM11,
        ...cardDM12,
        ...cardList,
      ];
    }),

    search: '',
    setSearch: action((state, payload) => {
      state.search = payload;
    }),

    matchingCards: computed((state) => {
      const allCards = state.allCards;
      const searchTerm = state.search ? state.search.toLowerCase() : '';

      return searchTerm ? allCards.filter(card => card.id && card.id.toLowerCase().includes(searchTerm)) : [];
    })
  },

  /*Dropdown Store Settings*/
  homeDropDown:{
    isActive: false,

    toggleActive: action((state) => {
    state.isActive = !state.isActive;

  }),
  },


  /* Cart Store Settings*/
  cart:{
    items:[],


    addToCart: action((state, payload) =>{
        state.items.push(payload);
        localStorage.setItem('cartItems', JSON.stringify(state.items))
    }),


    removeFromCart: action((state, index) =>{
      state.items.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(state.items))
    }),


    initializeCart: action((state) => {
      try {
        const storedItems = localStorage.getItem('cartItems');
        state.items = storedItems ? JSON.parse(storedItems) : [];
      } catch (error) {
        console.error("Error accessing localStorage:", error);
        state.items = [];
      }
    }),


    clearCart: action((state) =>{
      state.items = [];
    })

  },

  /* Checkout Settings*/
  deliveryInfo:{
    orders: [],


    submitInfo: action((state, payload) =>{
      state.orders.push(payload);
      localStorage.setItem('completedOrders', JSON.stringify(state.orders));
    }),


    initializeOrder: action((state) =>{
      try{
        const storedInfo = localStorage.getItem('completedOrders');
        state.orders = storedInfo ? JSON.getItem(storedInfo): []
      }
      catch(error){
        console.log('Error accessing localStorage', error)
        state.orders = [];
      }
    }),


    clearOrders: action((state) => {
      state.orders = [];
    })
  }
};

const store = createStore(storeModel);

export default store;
