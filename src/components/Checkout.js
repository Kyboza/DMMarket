import React from "react";
import { Link } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import Swal from "sweetalert2";

const Checkout = () => {
  const setFormData = useStoreActions((actions) => actions.cart.setFormData);
  const formData = useStoreState((state) => state.cart.formData);
  const cartItems = useStoreState((state) => state.cart.items);
  const checkoutCart = useStoreActions((actions) => actions.cart.checkoutCart);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitAndProceed = async (e) => {
    e.preventDefault();
  
    if (Object.values(formData).some((value) => value.trim() === "")) {
      Swal.fire({
        title: "Incomplete Form",
        text: "Please fill out all fields before proceeding.",
        icon: "warning",
        confirmButtonText: "Got It",
        confirmButtonColor: "#14BFEEBF",
      });
      return;
    }
  
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Cart Is Empty",
        text: "Please add items to your cart before proceeding to checkout.",
        icon: "warning",
        confirmButtonText: "Got It",
        confirmButtonColor: "#14BFEEBF",
      });
      return;
    }
  
    try {
      const response = await checkoutCart(cartItems);
      if (response.url) {
        window.location.href = response.url;
      } else {
        Swal.fire({
          title: "Checkout Error",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#14BFEEBF",
        });
      }
    } catch (error) {
      console.error(error.message)
    }
  };
  

  return (
    <main className="Main__container">
      <p className="Checkout__title">Checkout</p>
      <form className="Checkout__form_container" onSubmit={handleSubmitAndProceed}>
        <div className="Checkout__section_container">
          <label htmlFor="fullName" className="offscreen">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            className="Checkout__input"
            required
            autoComplete="off"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="Checkout__section_container">
          <label htmlFor="phone" className="offscreen">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Phone"
            className="Checkout__input"
            required
            autoComplete="off"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="Checkout__section_container">
          <label htmlFor="email" className="offscreen">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-Mail"
            className="Checkout__input"
            required
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="Checkout__section_container">
          <label htmlFor="country" className="offscreen">Country</label>
          <select
            name="country"
            id="country"
            className="Checkout__countries"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="SE">Sweden</option>
            <option value="US">America</option>
          </select>
        </div>

        <div className="Checkout__section_container">
          <label htmlFor="address" className="offscreen">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            className="Checkout__input"
            required
            autoComplete="off"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="Checkout__section_container">
          <label htmlFor="postalNumber" className="offscreen">Postal Number</label>
          <input
            type="number"
            name="postalNumber"
            id="postalNumber"
            placeholder="Postal Number"
            className="Checkout__input"
            required
            autoComplete="off"
            value={formData.postalNumber}
            onChange={handleChange}
          />
        </div>

        <div className="Cart__buttons_container">
          <Link to="/cart" className="Link__settings">
            <button className="Cart__button" type="button">Back to Cart</button>
          </Link>
          <button className="Cart__button" type="submit">Payment</button>
        </div>
      </form>
    </main>
  );
};

export default Checkout;
