import React, { useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const formData = useStoreState((state) => state.cart.formData);
  const setFormData = useStoreActions((actions) => actions.cart.setFormData);

  const clearCart = useStoreActions((actions) => actions.cart.clearCart);
  const clearOrders = useStoreActions(
    (actions) => actions.deliveryInfo.clearOrders
  );

  useEffect(() => {
    const formDataStorage = localStorage.getItem("formData");
    if (formDataStorage) {
      try {
        const parsedData = JSON.parse(formDataStorage);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing formData from localStorage:", error);
      }
    }
    return () => {
      clearCart();
      clearOrders();
    };
  }, [setFormData, clearCart, clearOrders]);

  return (
    <main className="Main__container">
      <p className="Order__title">
        Order Successful <IoIosCheckmarkCircleOutline className="Order__icon" />
      </p>
      <div className="Order__container">
        <p className="Order__details_title">Shipping Details</p>
        <div className="Order__inner_container">
          <div className="Order__pair_container">
            <p className="Order__detail">Name:</p>
            <p className="Order__detail">{formData.fullName}</p>
          </div>
          <div className="Order__pair_container">
            <p className="Order__detail">Phone:</p>
            <p className="Order__detail">{formData.phone}</p>
          </div>
          <div className="Order__pair_container">
            <p className="Order__detail">E-Mail:</p>
            <p className="Order__detail">{formData.email}</p>
          </div>
          <div className="Order__pair_container">
            <p className="Order__detail">Country:</p>
            <p className="Order__detail">{formData.country}</p>
          </div>
          <div className="Order__pair_container">
            <p className="Order__detail">Address:</p>
            <p className="Order__detail">{formData.address}</p>
          </div>
          <div className="Order__pair_container">
            <p className="Order__detail">Postal Number:</p>
            <p className="Order__detail">{formData.postalNumber}</p>
          </div>
        </div>
      </div>
      <div className="Cart__buttons_container">
        <Link to="/" className="Link__settings">
          <button className="Order__button">Home</button>
        </Link>
      </div>
    </main>
  );
};

export default OrderSuccess;
