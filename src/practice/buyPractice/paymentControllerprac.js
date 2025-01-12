const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config()

const paymentHandlingTest = async (req, res) => {
    try{
        const {cartItems} = req.body;
        if(!cartItems){
            res.status(400).json({message: 'Could not recieve cartitems'})
        }
        
        const session = await stripe.checkout.session.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: cartItems.map(item => ({ 
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name
                        },
                    unit_amount: item.price * 100
                    },
                quantity_amount: item.amount
            })),
            success: `${process.env.SERVER_URL}/orderSuccessprac`,
            cancel: `${process.env.SERVER_URL}/checkout` 
        });
        res.json({url: session.url})
}
catch(e){
    res.status(500).json({error: e.message})
}
}

module.exports = paymentHandlingTest;