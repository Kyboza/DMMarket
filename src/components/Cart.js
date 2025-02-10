import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

const Cart = () => {
  const cartItems = useStoreState((state) => state.cart.items);
  const clearFormData = useStoreActions(
    (actions) => actions.cart.clearFormData
  );
  const removeItem = useStoreActions((actions) => actions.cart.removeFromCart);
  const increaseCart = useStoreActions((actions) => actions.cart.increaseCart);
  const decreaseCart = useStoreActions((actions) => actions.cart.decreaseCart);
  const initializeCart = useStoreActions(
    (actions) => actions.cart.initializeCart
  );

  const navigate = useNavigate();
  const totalCartAmount = cartItems
    ? cartItems.reduce((total, card) => total + card.amount, 0)
    : 0;

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, card) => total + card.price * card.amount, 0)
      .toFixed(2);
  };

  const cartProceed = async (cartItems) => {
    if (cartItems.length > 0) {
      await clearFormData();
      navigate("/checkout");
    } else {
      Swal.fire({
        title: "Cart Is Empty",
        text: "Please add items to your cart before proceeding to checkout.",
        icon: "warning",
        confirmButtonText: "Got It",
        confirmButtonColor: "#14BFEEBF",
      });
    }
  };

  const addCopy = (index) => {
    if (totalCartAmount < 8) {
      increaseCart(index);
    } else {
      Swal.fire({
        title: "Cart is full",
        icon: "error",
        text: "Max 8 Copies Allowed",
        timer: 1500,
        confirmButtonText: "Ok",
        confirmButtonColor: "#14BFEEBF",
      });
    }
  };

  const removeCopy = (index) => {
    const specificCard = cartItems[index];

    if (specificCard) {
      const cardAmount = specificCard.amount;

      if (cardAmount > 1) {
        decreaseCart(index);
      } else {
        Swal.fire({
          title: "Remove Card From Cart?",
          text: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          cancelButtonColor: "#f5c6cb",
          confirmButtonText: "Yes",
          confirmButtonColor: "#14BFEEBF",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Card Removed Successfully",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });

            removeItem(index);
          } else {
            Swal.fire({
              title: "No Problem",
              text: "The card is still in your cart.",
              timer: 1000,
              confirmButtonText: "Ok",
              confirmButtonColor: "#14BFEEBF",
            });
          }
        });
      }
    } else {
      console.log("Card not found in cart.");
    }
  };

  const removeItemFromCart = (index) => {
    Swal.fire({
      title: "Remove Card From Cart?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No",
      cancelButtonColor: "#f5c6cb",
      confirmButtonText: "Yes",
      confirmButtonColor: "#14BFEEBF",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Card Removed Successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        removeItem(index);
      } else if (result.dismiss) {
        Swal.fire({
          title: "No Problem",
          text: "The card is still in your cart.",
          timer: 1000,
          confirmButtonText: "Ok",
          confirmButtonColor: "#14BFEEBF",
        });
      }
    });
  };

  return (
    <main className="Main__container">
      <p className="Cart__title">My Cart</p>
      <div className="Cart__container">
        <ul className="Cart__ul">
          {cartItems.length === 0 ? (
            <li className="Cart__li_empty">
              <p className="Cart__li_p">Empty Cart</p>
            </li>
          ) : (
            cartItems.map((card, index) => (
              <li className="Cart__li" key={index}>
                <p className="Cart__li_p">{card.amount}x</p>
                <p className="Cart__li_p">{card.id}</p>
                <div>
                  <CiCirclePlus
                    className="Cart__item_icons"
                    onClick={() => addCopy(index)}
                  />
                  <IoIosRemoveCircleOutline
                    className="Cart__item_icons"
                    onClick={() => removeCopy(index)}
                  />
                  <FaRegTrashCan
                    className="Cart__item_icons"
                    onClick={() => removeItemFromCart(index)}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="Cart__total_container">
        <p className="Cart__p_total">Total: ${calculateTotal()}</p>
      </div>

      <div className="Cart__buttons_container">
        <Link to="/" className="Link__settings">
          <button className="Cart__button">Home</button>
        </Link>

        <button className="Cart__button" onClick={() => cartProceed(cartItems)}>
          Checkout
        </button>
      </div>
    </main>
  );
};

export default Cart;
