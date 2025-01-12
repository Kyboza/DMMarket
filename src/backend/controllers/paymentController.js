require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const paymentHandler = async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "No cart items provided" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.amount,
      })),
      success_url: `${process.env.SERVER_URL}/ordersuccess`,
      cancel_url: `${process.env.SERVER_URL}/checkout`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error("Error creating Stripe session:", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = paymentHandler;
