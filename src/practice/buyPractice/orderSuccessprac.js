import React, { useEffect } from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    // Accessing the formData from the store (instead of localStorage)
    const formDataTest = useStoreState((state) => state.cartTest.formDataTest);
    const setFormDataTest = useStoreActions((actions) => actions.cartTest.setFormDataTest);
    
    // Actions from Easy Peasy store
    const clearCart = useStoreActions((actions) => actions.cart.clearCart);
    const clearOrders = useStoreActions((actions) => actions.deliveryInfo.clearOrders);

   useEffect(() => {
        const storageCredentials = localStorage.getItem('formDataTest');
        if(storageCredentials){
            try{
                const formDataTest = JSON.parse(storageCredentials);
                setFormDataTest(formDataTest)
            }
            catch(error){
                console.log(error)
            }
        }

        return() => {
            clearCart()
            clearOrders()
        }
   }, [setFormDataTest, clearCart, clearOrders])

    
    
    return (
        <main className='Main__container'>
            <p className='Order__title'>Order Successful <IoIosCheckmarkCircleOutline className='Order__icon' /></p>
            <div className='Order__container'>
                <p className='Order__details_title'>Shipping Details</p>
                {/* Render the formData directly from the store */}
                <div className='Order__inner_container'>
                    <div className='Order__pair_container'>
                        <p className='Order__detail'>Name:</p>
                        <p className='Order__detail'>{formDataTest.fullName}</p>
                    </div>
                    <div className='Order__pair_container'>
                        <p className='Order__detail'>Phone:</p>
                        <p className='Order__detail'>{formDataTest.phone}</p>
                    </div>
                    <div className='Order__pair_container'>
                        <p className='Order__detail'>E-Mail:</p>
                        <p className='Order__detail'>{formDataTest.email}</p>
                    </div>
                    <div className='Order__pair_container'>
                        <p className='Order__detail'>Country:</p>
                        <p className='Order__detail'>{formDataTest.country}</p>
                    </div>
                    <div className='Order__pair_container'>
                        <p className='Order__detail'>Address:</p>
                        <p className='Order__detail'>{formDataTest.address}</p>
                    </div>
                    <div className='Order__pair_container'>
                        <p className='Order__detail'>Postal Number:</p>
                        <p className='Order__detail'>{formDataTest.postalNumber}</p>
                    </div>
                </div>
            </div>
            <div className='Cart__buttons_container'>
                <Link to='/' className='Link__settings'>
                    <button className='Order__button'>Home</button>
                </Link>
            </div>
        </main>
    );
};

export default OrderSuccess;
