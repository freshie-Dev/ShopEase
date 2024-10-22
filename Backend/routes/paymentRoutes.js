const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_51PIsNORtrR5OEeMFvqNdReTVFRg1ZtUA9K8hV1FPQAKEBzC4rzH33dplSeKaCeJGE4y08dLlGWtV35VWMas5dgGm00dzCBOlDB");

const { Product, User, Order } = require('../DB.js'); // Product Schema
const { verifyToken } = require('../middleware/middleware.js'); // middle functions
const bodyParser = require('body-parser');


router.route('/')
  .post(verifyToken, bodyParser.json(), async (req, res) => {

    try {
      const products = req.body
      const customer = await stripe.customers.create({
        metadata: {
          userId: req.userId,
          cart: JSON.stringify(products)
        }
      })
      const productPromises = products.map(async (item) => {
        const storeItem = await Product.findById(item._id);
        return {
          price_data: {
            currency: 'pkr',
            product_data: {
              name: storeItem.title,
              // images: [storeItem.imageUrl],
              images: ['https://saraclothes.com/cdn/shop/products/E0058-204-006_1_900x_4fd1e6fc-f7c5-48b5-9c49-2d552af0c899.jpg?v=1653241951'],
              description: storeItem.description,
              metadata: {
                id: storeItem._id,
                // color: storeItem.attributes.colorName === item.color &&  item.color,
                color: "#16c4c4",
                size: item.size,
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


// // This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
endpointSecret = "whsec_e2f6ad3a189d64e82f250d8b2eec7cc04a7f32637c1e28e85c54ed0b8a22a4f4";

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), (req, res) => {
 
 
  const sig = req.headers['stripe-signature'];
  
  let data;
  let eventType;

  if (endpointSecret) {
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Verified WEBHOOK")
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object
    eventType = event.type
  } else {
    data = req.body.data.object
    eventType = req.body.type
  }

  //! Handle the event
  if (eventType === "checkout.session.completed") {
    console.log("session completed running")
    stripe.customers.retrieve(data.customer)
      .then((customer) => {

        const userId = customer.metadata.userId
        const cartItems = JSON.parse(customer.metadata.cart)
        const address = data.customer_details.address        
        const email = customer.email
        const name = data.customer_details.name
        createOrder(userId, cartItems, address, email, name)

      })
      .catch((err) => {
        console.log("error in session completion")
        console.log(err.message)
      })
  }

  //* Return a 200 response to acknowledge receipt of the event
  res.send().end();
});



//! create an order
const createOrder = async (userId, cartItems, address, email, name) => {
  console.log("customer id",userId)
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const productPromises = cartItems.map(async (item) => {
    const cartItem = await Product.findById(item._id)
    return cartItem
  })
  const products = await Promise.all(productPromises);
//  console.log("1. products", products)
  const newAddress = {
    city: address.city,
    area: address.line1 + "," + address.line2,
    zip_code: address.postal_code,
    email,
    customerName: name
  }

  // console.log("2. newAddress", newAddress)
  // console.log("3. cartItems", cartItems)


  user.address.push(newAddress)
  const savedAddressUser = await user.save()
  console.log(savedAddressUser)
  const addedAddress = user.address[user.address.length - 1];

  const sellerGroups = {};
  products.forEach(item => {
    if (!sellerGroups[item.userId]) {
      sellerGroups[item.userId] = [];
    }
    let i = 0
    sellerGroups[item.userId].push({
      imageUrl: item.imageUrl,
      name: item.title,
      price: item.price,
      productId: cartItems[i]._id,
      quantity: cartItems[i].quantity,
      color: cartItems[i].color,
    })
  });

  // console.log(sellerGroups)
  for (const sellerId in sellerGroups) {
    const order = {
      sellerId,
      customerId: userId,
      items: sellerGroups[sellerId],
      orderDate: Date.now(),
      selectedAddress: addedAddress._id,
    };
    // Save order to Orders collection 
    const newOrder = new Order(order);
    await newOrder.save();

  }



}


module.exports = router;
