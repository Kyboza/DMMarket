const express = require('express');
const app = express();

app.use(express.json());

app.use('/checkout-cart-test', require('./paymentRedirectprac'));