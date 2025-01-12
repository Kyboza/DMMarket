import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Swal from 'sweetalert2';

const Checkout = () => {
    const setFormData = useStoreActions((actions) => actions.cart.setFormData);
    const formData = useStoreState((state) => state.cart.formData);
    const cartItems = useStoreState((state) => state.cart.items);
    const checkoutCart = useStoreActions((actions) => actions.cart.checkoutCart);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Create the updated form data
        const updatedFormData = {
            ...formData,
            [name]: value,
        };
    
        // Update both the store and localStorage
        setFormData(updatedFormData);
    };

    const handleSubmitAndProceed = async (e) => {
        e.preventDefault();

        // Check if all fields are filled out
        const emptyFieldsCheck = Object.values(formData).filter(value => value.trim() === '');

        if (emptyFieldsCheck.length === 0) {
            // Ensure there are items in the cart before proceeding
            if (cartItems.length > 0) {
                try {
                    const response = await checkoutCart(cartItems);
                    const { url } = response;

                    if (url) {
                        window.location.href = url;
                    } else {
                        throw new Error('Failed to retrieve checkout session URL.');
                    }
                } catch (error) {
                    console.error('Error during checkout:', error);
                    Swal.fire({
                        title: 'Checkout Error',
                        text: error.message || 'Something went wrong. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#14BFEEBF',
                    });
                }
            } else {
                Swal.fire({
                    title: 'Cart Is Empty',
                    text: 'Please add items to your cart before proceeding to checkout.',
                    icon: 'warning',
                    confirmButtonText: 'Got It',
                    confirmButtonColor: '#14BFEEBF',
                });
            }
        } else {
            Swal.fire({
                title: 'Incomplete Form',
                text: 'Please fill out all fields before proceeding.',
                icon: 'warning',
                confirmButtonText: 'Got It',
                confirmButtonColor: '#14BFEEBF',
            });
        }
    };

    return (
        <main className="Main__container">
            <p className="Checkout__title">Checkout</p>
            <form className="Checkout__form_container" onSubmit={handleSubmitAndProceed}>
                <label htmlFor="checkout" className="offscreen">Checkout</label>

                <div className="Checkout__section_container">
                    <input 
                        type="text"
                        name="fullName"
                        id="checkfullname"
                        placeholder="Full Name"
                        className="Checkout__input"
                        required
                        autoComplete="off"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="Checkout__section_container">
                    <input 
                        type="tel"
                        name="phone"
                        id="checkphone"
                        placeholder="Phone"
                        className="Checkout__input"
                        required
                        autoComplete="off"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="Checkout__section_container">
                    <input 
                        type="email"
                        name="email"
                        id="checkemail"
                        placeholder="E-Mail"
                        className="Checkout__input"
                        required
                        autoComplete="off"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="Checkout__country_container">
                    <select 
                        name="country" 
                        id="countries" 
                        className="Checkout__countries" 
                        value={formData.country} 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Country</option>
                        <option value="SE" className="Checkout__country">Sweden</option>
                        <option value="US" className="Checkout__country">America</option>
                    </select>
                </div>

                <div className="Checkout__section_container">
                    <input 
                        type="text"
                        name="address"
                        id="checkadress"
                        placeholder="Address"
                        className="Checkout__input"
                        required
                        autoComplete="off"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="Checkout__section_container">
                    <input 
                        type="number"
                        name="postalNumber"
                        id="checkpostnr"
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
                    <button className="Cart__button" type="submit">
                        Payment
                    </button>
                </div>
            </form>
        </main>
    );
};

export default Checkout;
