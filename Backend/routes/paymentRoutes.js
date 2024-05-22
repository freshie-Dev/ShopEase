const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_51PIsNORtrR5OEeMFvqNdReTVFRg1ZtUA9K8hV1FPQAKEBzC4rzH33dplSeKaCeJGE4y08dLlGWtV35VWMas5dgGm00dzCBOlDB");

const { Product } = require('../DB.js'); // Product Schema
// const storeItems = new Map([
//   [1, { priceInRupees: 10, name: 'item1', description: 'item1 description' }],
//   [2, { priceInRupees: 20, name: 'item2', description: 'item2 description' }],
// ]);



router.route('/')
.post(async (req, res) => {

  try {

    const products = req.body

    const productPromises = products.map(async (item) => {

      const storeItem = await Product.findById(item.id);

      return {

        price_data: {

          currency: 'pkr',


          product_data: {


            name: storeItem.title,


          },


          unit_amount: Math.round(storeItem.price * 100),


        },


        quantity: item.quantity,


      };


    });


    const productsData = await Promise.all(productPromises);


    const sessionn = await stripe.checkout.sessions.create({

      payment_method_types: ['card'],

      mode: 'payment',

      success_url: `http://localhost:5173/buyer/cart/?productsData=${JSON.stringify(productsData)}`,

      cancel_url: `http://localhost:5173/buyer/cart/`,

      line_items: productsData,

    });


    res.json({ url: sessionn.url });


  } catch (error) {


    console.error('Error while Payment Procedure:', error);


    res.status(500).json({ success: false, message: 'Internal Server Error' });


  }


});

module.exports = router;
