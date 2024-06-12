const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_51PIsNORtrR5OEeMFvqNdReTVFRg1ZtUA9K8hV1FPQAKEBzC4rzH33dplSeKaCeJGE4y08dLlGWtV35VWMas5dgGm00dzCBOlDB");

const { Product } = require('../DB.js'); // Product Schema
const { verifyToken } = require('../middleware/middleware.js'); // middle functions


router.route('/')
  .post(verifyToken, async (req, res) => {

    try {
      const products = req.body
      console.log(products)

      const customer = await stripe.customers.create({
        metadata: {
          userId: req.userId,
          cart: JSON.stringify(products)
        }
      })
      const productPromises = products.map(async (item) => {
        const storeItem = await Product.findById(item.id);
        console.log(storeItem.imageUrl)
        return {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: storeItem.title,
              images: [storeItem.imageUrl],
              description: storeItem.description,
              metadata: {
                id: storeItem._id
              }
            },
            unit_amount: Math.round(storeItem.price * 100),
          },
          quantity: item.quantity,
        };
      });
      const productsData = await Promise.all(productPromises);
      
      const shipping_options = [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 5000, // Shipping cost in the smallest currency unit (e.g., cents for USD)
              currency: 'pkr',
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 5,
              },
              maximum: {
                unit: 'business_day',
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 10000, // Shipping cost in the smallest currency unit
              currency: 'pkr',
            },
            display_name: 'Express Shipping',
            delivery_estimate: {
              minimum: {
                unit: 'business_day',
                value: 2,
              },
              maximum: {
                unit: 'business_day',
                value: 3,
              },
            },
          },
        },
      ];
      const shipping_address_collection = {
        allowed_countries: ['US', 'CA', 'PK'],
      };

      const sessionn = await stripe.checkout.sessions.create({
        payment_method_types: ['card'], //default
        mode: 'payment',
        success_url: `http://localhost:5173/buyer/payment/paid`,
        cancel_url: `http://localhost:5173/buyer/payment/un_paid`,
        line_items: productsData,
        customer: customer.id,
        shipping_address_collection,
        shipping_options,
      });

      res.json({ url: sessionn.url, sessionId: sessionn.id });

    } catch (error) {
      console.error('Error while Payment Procedure:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });



module.exports = router;
